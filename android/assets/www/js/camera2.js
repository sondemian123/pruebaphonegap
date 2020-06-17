$('takepic').click(function () {
    navigator.mediaDevices.getUserMedia({
        'audio': true,
        'video': {
            facingMode: 'user'
        }
    }).then(function (getmedia) {
        var track = getmedia.getVideoTracks()[0];
        var imageCapture = new ImageCapture(track);
        imageCapture.takePhoto()
            .then(blob => {
                console.log('Photo taken: ' + blob.type + ', ' + blob.size + 'B');
                const image = document.querySelector('img'); // img is an <img> tag
                image.src = URL.createObjectURL(blob);
            })
            .catch(err => console.error('takePhoto() failed: ', err));
    });
})