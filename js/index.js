//Global Variable
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var watchID = null;

function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById('smallImage');
    smallImage.style.display = 'block';
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
}

function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                                destinationType: destinationType.DATA_URL });
}

function capturePhotoEdit() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
                                destinationType: destinationType.DATA_URL });
}

function getPhoto(source) {
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                                destinationType: destinationType.FILE_URI,
                                sourceType: source });
}
function onFail(message) {
    alert('Failed because: ' + message);
}


//Acceleration
function startWatch() {
    var options = { frequency: 3000 };
    watchID = navigator.compass.watchHeading(onWatchSuccess, onWatchError, options);
}

function stopWatch() {
    if (watchID) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
    }
}

function onWatchSuccess(heading) {
    var element = document.getElementById('heading');
    element.innerHTML = 'Heading: ' + heading.magneticHeading;
}

function onWatchError(compassError) {
    alert('Compass error: ' + compassError.code);
}

//CONTACTS
function createCon(){
    // create a new contact object
    var contact = navigator.contacts.create();
    contact.displayName = document.getElementById('conAdd').value;
    contact.nickname = document.getElementById('conAdd').value;
    // save to device
    contact.save(onSaveSuccess,onSaveError);
}

function onSaveSuccess(contact) {
    alert("Save Success");
}

function onSaveError(contactError) {
    alert("Error = " + contactError.code);
}

function findCon(){
    var options = new ContactFindOptions();
    options.filter = document.getElementById('conFin').value;
    var fields = ["displayName", "nickname"];
    navigator.contacts.find(fields, onFindSuccess, onFindError, options);
}

function onFindSuccess(contacts) {
    // display the address information for all contacts
    for (var i = 0; i < contacts.length; i++) {
        alert(contacts[i].displayName);
    }
}

function onFindError(contactError) {
    alert("Error = " + contactError.code);
}


function removeCon(){
    var options = new ContactFindOptions();
    options.filter = document.getElementById('conRem').value;
    var fields = ["displayName", "nickname"];
    navigator.contacts.find(fields, onRemoveSuccess, onRemoveError, options);
    
}

function onSuccessRemove(contacts) {
    for (var i = 0; i < contacts.length; i++) {
        contacts[i].remove(onRemoveSuccess,onRemoveError);
    }
}

function onRemoveSuccess(contacts) {
    alert("Removal Success");
}

function onRemoveError(contactError) {
    alert("Error = " + contactError.code);
}

//NOTIFICATIONS
function alertDismissed() {
    // do something
}

function showAlert() {
    navigator.notification.alert(
                                 'You are the winner!',  // message
                                 alertDismissed,         // callback
                                 'Game Over',            // title
                                 'Done'                  // buttonName
                                 );
}

function playBeep() {
    navigator.notification.beep(3);
}

function vibrate() {
    navigator.notification.vibrate(2000);
}

function onPrompt(results) {
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}
function showPrompt() {
    navigator.notification.prompt(
                                  'Please enter your name',  // message
                                  onPrompt,                  // callback to invoke
                                  'Registration',            // title
                                  ['Ok','Exit'],             // buttonLabels
                                  'default Text'                 // defaultText
                                  );
}

//Geolocation
function onGeoSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
    'Longitude: '          + position.coords.longitude             + '<br />' +
    'Altitude: '           + position.coords.altitude              + '<br />' +
    'Accuracy: '           + position.coords.accuracy              + '<br />' +
    'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
    'Heading: '            + position.coords.heading               + '<br />' +
    'Speed: '              + position.coords.speed                 + '<br />' +
    'Timestamp: '          + position.timestamp                    + '<br />';
}

function onGeoError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


//FILE
function writeFile() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
    fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, writerFail);
}

function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
        console.log("contents of file now 'some sample text'");
        writer.truncate(11);
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample'");
            writer.seek(4);
            writer.write(" different text");
            writer.onwriteend = function(evt){
                console.log("contents of file now 'some different text'");
            }
        };
    };
    writer.write("some sample text");
}

function writerFail(error) {
    console.log(error.code);
}

//Compass
function getCurrentHeading() {
    navigator.compass.getCurrentHeading(onCompSuccess, onCompError);
}

function onCompSuccess(heading) {
    alert('Heading: ' + heading.magneticHeading);
}
function onCompError(compassError) {
    alert('Compass Error: ' + compassError.code);
}