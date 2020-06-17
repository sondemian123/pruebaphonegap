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
    var url = get_base_url() + "rest/event/";
    var auth_headers = {
        Authorization: 'Token ' + token
    };
    var options = {
        success: process_response,
        error: process_error,
        url: get_base_url() + 'rest/event/',
        dataType: 'json',
        headers: auth_headers
    }

    function process_response(responseText, statusText, xhr, $form) {
        // 2do redirect to item
        url = responseText.get_rest_url;
        window.location.href = url
    }

    function process_error(responseText, statusText, xhr, $form) {
        $('#message').html('Por favor intente nuevamente')
    }

    $('#publish').ajaxForm(options);

    var options_categories = {
        url: get_base_url() + 'rest/get_categories_todas/',
        dataType: 'json',
        headers: auth_headers,
        success: function (data) {
            $('#category_container').html(data);
            $('select').material_select();
        }
    };
    $.ajax(options_categories);

    function get_latest_bazar_posts(token) {
        $('.spinner').show();
        var url = get_base_url() + "rest/get_latest_bazar_posts/";
        var auth_headers = {
            Authorization: 'Token ' + token
        };
        var user_ajax_obj = {
            url: url,
            dataType: 'json',
            headers: auth_headers,
            success: function (data) {
                $('.spinner').hide();
                console.log('authorized user returned');
                //$(data).hide().prependTo('#main_wall').fadeIn("slow");
                $.each(data, function (index, value) {
                    $(value).delay(100 * index).hide().slideUp('fast').prependTo('#main_wall').slideDown("slow");
                })

                // $('#main_wall').append(data)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('error returned from ' + url);
                $('.spinner').hide();
                alert_problem();

            }
        };
        $.ajax(
            user_ajax_obj
        );
    }

    get_latest_bazar_posts(token);


});
