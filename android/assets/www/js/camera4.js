/**
 * Created by rodrigo on 4/12/17.
 */
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var image = "";


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    function alertDismissed() {
    };
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}
var cameraOptions = {
    quality: 75,
    destinationType: 0,
    targetWidth: 750,
    targetHeight: 500,
    encodingType: 0    // 0=JPG 1=PNG
};
function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, cameraOptions);
}


var selectOptions = {
    pictureSource: pictureSource.PHOTOLIBRARY,
    quality: 75,
    destinationType: 0,
    targetWidth: 750,
    targetHeight: 500,
    encodingType: 0    // 0=JPG 1=PNG
};

function selectPhoto() {
    navigator.camera.getPicture(onPhotoSelectSuccess, onFail, selectOptions);
}

function getFormData(data) {
    var fd = new FormData();
    fd.append('photo', new Blob([data.photo], {type: 'image\/jpeg'}));
    return fd
}


function onPhotoDataSuccess(imageData) {
    alert(imageData);
    var smallImage = document.getElementById('smallImage');

    smallImage.style.display = 'block';

    smallImage.src = imageData;

    image = "data:image/jpeg;base64," + imageData;

    alert("Image = " + image);
}
function onPhotoSelectSuccess(imageData) {

    var smallImage = document.getElementById('smallImage');

    smallImage.style.display = 'block';

    smallImage.src = "data:image/jpeg;base64," + imageData;

    image = imageData;

    alert("Image = " + image);
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function submitFunction() {

    function alertDismissed() {
    };

    var dataString = 'image=' + image;

    $.ajax({
        type: "POST",
        url: "url.php",
        data: dataString,
        cache: false,
        success: function (result) {

        }
    });

}