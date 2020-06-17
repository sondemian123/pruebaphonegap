$(function () {
    function get_base_url() {
        if (localStorage.base_url) {
            return localStorage.base_url
        } else {
            return config.base_url
        }
    }
    // on load, check if we have a token,
    // if we do, go to wall
    // if we don't, stay here
    if (localStorage.token) {
        window.location.href = 'wall.html'
    }
    else {
        // we don't have a token, we need to log in

    }
    var options = {
        beforeSubmit: before_submit,
        success: process_response,
        error: process_error,
        url: get_base_url() + 'rest/get_auth_token/'
    }

    function process_response(responseText, statusText, xhr, $form) {
        $('.spinner').hide();
        token = responseText.token;
        localStorage.token = token;
        window.location.href = 'wall.html'
    }

    function process_error(responseText, statusText, xhr, $form) {
        $('.spinner').hide();
        $('#message').hide().html('Por favor intenta nuevamente').slideDown('slow');
    }

    function before_submit() {
        $('.spinner').show();
        $('#message').html('');
    }

    $('#login').ajaxForm(options);

    $('#hide_password').hide();
    var previous_password_type = 'text';
    var current_password_type = 'password';

    $('.toggle_password').click(function () {
            $('.toggle_password').toggle();
            current_password_type = $('#pass').attr('type');
            $('#pass').attr('type', previous_password_type);
            previous_password_type = current_password_type;
        }
    )
});
