/**
 * Created by rodrigo on 1/6/17.
 */


$(function () {


    function get_token() {
        if (localStorage.token) {
            return localStorage.token
        } else {
            window.location.href = 'index.html'
            return false
        }
    }


    // get users new content
    var token = get_token();
    if (token === false) {
        window.location.href = 'index.html'
    }
    // form stuff
    var url = get_base_url() + "rest/answer_poll/";
    var auth_headers = {
        Authorization: 'Token ' + token
    };
    var options = {
        success: process_response,
        error: process_error,
        beforeSubmit: before_submit,
        url: get_base_url() + 'rest/answer_poll/',
        dataType: 'json',
        headers: auth_headers
    }

    function before_submit(formData, jqForm, options) {
        $("button[type=submit]").attr('disabled', 'disabled');
        $('.spinner').show();
        $("button[type=submit]").attr('disabled', 'disabled');
        $('#message').html('');
    }

    function process_response(responseText, statusText, xhr, $form) {
        url = "wall.html";
        $('.spinner').hide();
        window.location.href = url
    }

    function process_error(responseText, statusText, xhr, $form) {
        $('.spinner').hide();
        $('#message').html('Por favor intente nuevamente');
        $("button[type=submit]").prop("disabled", false);

    }

    $('#messageform').ajaxForm(options);


    var options_bancos_asesor = {
        url: get_base_url() + 'rest/get_bancos_asesor/',
        dataType: 'json',
        headers: auth_headers,
        success: function (data) {
            if (data) {
                $('.onlybazar').after(data)
            }
        }
    };


    $('#bottom-nav').delay('1000').animate({'bottom': '-=80px'}, 'slow')

   $('select').material_select();



});
