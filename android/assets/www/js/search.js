/**
 * Created by rodrigo on 1/6/17.
 */

$(function () {
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
    var query = getUrlParameter('q');
    var category = getUrlParameter('category');
    $('#query').html(query);

    var url = get_base_url() + 'rest/newsearch/?text=' + query + "/";
    $('#search').val(query);
    if (category) {
        url = get_base_url() + 'rest/newsearch/?text=' + query + "&category=" + category;
        $('#query').html(query + " | " + category);
    }


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
            data.reverse();
            $('.spinner').hide();

            $.each(data.slice(0, 25), function (index, value) {
                url2 = get_base_url() + 'rest/event/' + value.id + "/";
                ajax_obj_2 = {
                    url: url2,
                    dataType: 'json',
                    headers: auth_headers,
                    success: function (data) {
                        $(data.render_rest_mini).hide().slideUp('fast').prependTo('#main_wall').slideDown("slow");
                    },
                    async: false
                };
                $.ajax(
                    ajax_obj_2
                );
            })
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('error returned from ' + url);
            alert_problem();
        }
    };
    $('.spinner').show();

    $.ajax(
        user_ajax_obj
    );


})
