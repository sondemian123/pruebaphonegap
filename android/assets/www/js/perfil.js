/**
 * Created by rodrigo on 1/6/17.
 */

$(function () {
    $('.spinner').show();

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    var id = getUrlParameter('id');
    var url = get_base_url() + 'rest/get_user_profile/' + id + "/";

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
    var user_ajax_obj = {
        url: url,
        dataType: 'json',
        headers: auth_headers,
        success: function (data) {
            $('.spinner').hide();
            $('.main_content').html(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('.spinner').hide();
            console.log('error returned from ' + url);
            alert_problem();
        }
    };
    $.ajax(
        user_ajax_obj
    );
})
