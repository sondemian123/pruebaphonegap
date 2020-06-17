/**
 * Created by rodrigo on 1/6/17.
 */

$(function () {
    // $('.spinner').show();


    var url = get_base_url() + 'rest/feedback/';

    function get_token() {
        if (localStorage.token) {
            return localStorage.token
        } else {
            window.location.href = 'index.html'
            return false
        }
    }

    var token = get_token();
    if (token === false) {
        window.location.href = 'index.html'
    }
    var auth_headers = {
        Authorization: 'Token ' + token
    };

    var options_commentform = {
        url: url,
        dataType: 'json',
        headers: auth_headers,
        beforeSubmit: function (data) {
            $('.spinner').show();
        },
        success: function (data) {
            $('.spinner').hide();
            $('#message').val("");
             Materialize.toast(data, 5000, 'toasty');
            $('#result').html(data);
             $('form').find("input[type=text], textarea").val("");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('.spinner').hide();
            console.log('error returned from ' + url);
            alert_problem();
        },
    }

    $('#messageform').ajaxForm(options_commentform);

})
