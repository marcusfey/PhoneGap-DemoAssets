//Global Variable
var pictureSource;   // picture source
var destinationType; // sets the format of returned value

//OnDeviceReady
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    startWatch();
}

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
    watchID = navigator.accelerometer.watchAcceleration(onAccSuccess, onAccError, options);
}

function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

function onAccSuccess(acceleration) {
    var element = document.getElementById('accelerometer');
    
    element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
    'Acceleration Y: ' + acceleration.y + '<br />' +
    'Acceleration Z: ' + acceleration.z + '<br />' +
    'Timestamp: '      + acceleration.timestamp + '<br />';
}

function onAccError() {
    alert('onAccError!');
}

//CONTACTS
function createCon(){
    // create a new contact object
    var contact = navigator.contacts.create();
    contact.displayName = "AA";
    contact.nickname = "AA";
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
    options.filter = "AA";
    var fields = ["displayName", "nickname"];
    navigator.contacts.find(fields, onFindSuccess, onFindError, options);
}

function onFindSuccess(contacts) {
    for (var i = 0; i < contacts.length; i++) {
        alert("Display Name = " + contacts[i].nickname);
    }
}

function onFindError(contactError) {
    alert("Error = " + contactError.code);
}


function removeCon(){
    var options = new ContactFindOptions();
    options.filter = "AA";
    var fields = ["displayName", "nickname"];
    navigator.contacts.find(fields, onSuccessRemove, onRemoveError, options);
    
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


