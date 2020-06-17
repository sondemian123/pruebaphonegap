$(function () {
        document.addEventListener("deviceready", onDeviceReady, false);

        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            document.getElementById("image").src = "data:image/jpeg;base64," + imageData;

        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
        function onDeviceReady() {
            $('.takepicture').click(function () {
                    navigator.camera.getPicture(onSuccess, onFail, {
                        quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL
                    });
                }
            )
        }
    }
)
