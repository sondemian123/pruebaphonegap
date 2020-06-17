var pictureSource;   // picture source
var destinationType; // sets the format of returned value
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData) {
    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');
    // Unhide image elements
    //
    smallImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoFileSuccess(imageData) {
    // Get image handle
    console.log(JSON.stringify(imageData));

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');
    // Unhide image elements
    //
    smallImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = imageData;
}

function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    console.log(imageURI);
    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');
    // Unhide image elements
    //
    smallImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = imageData;
}

// function capturePhotoWithData() {
//   // Take picture using device camera and retrieve image as base64-encoded string
//   navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
// }
function capturePhotoWithFile() {
    // take camera pic
    navigator.camera.getPicture(onPhotoFileSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });
}


function getPhoto() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: pictureSource.PHOTOLIBRARY
    });
}
// Called if something bad happens.
//
function onFail(message) {
    console.log('Failed because: ' + message);
}