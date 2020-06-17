$(function () {

    function get_token() {
        if (localStorage.token) {
            return localStorage.token
        } else {
            alert('error 1');
            window.location.href = 'index.html';
            return false
        }
    }


    // get users new content
    var token = get_token();
    if (token === false) {
        window.location.href = 'wall.html'
    }

    var options = {
        url: get_base_url() + "rest/change_password/",
        dataType: 'json',
        headers: {
            Authorization: 'Token ' + token
        },
        success: function (data) {
            $('.spinner').hide();

            if (data = 'success') {
                window.location.href = 'index.html'
            }
            else if (data = 'norut') {
                 $('#message').html("<p><strong>¡Por favor no uses tu rut como clave!<strong></p>")
            }
            else {
                $('#message').html("<p><strong>Por favor intenta de nuevo <strong></p>")

            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('.spinner').hide();
            console.log('error returned');
            alert_problem();
        },
        beforeSubmit: function () {
            $('.spinner').show();
        }
    };
    $('#change_password').ajaxForm(options);
})



