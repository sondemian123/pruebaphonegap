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

    var url = get_base_url() + 'rest/event/' + id + "/";

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
            $('.main_content').html(data.render_rest);
            $('.edit').hide();
            $('#sendcomment').ajaxForm(options_commentform);
            var event_user_id = data.user_id;
            user_id_obj = {
                url: get_base_url() + "rest/user_id/",
                dataType: 'json',
                headers: auth_headers,
                success: function (data) {
                    var user_id = data;
                    if (user_id == event_user_id) {
                        $('.edit').show();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log('error returned');
                    alert_problem();
                }
            }
            $.ajax(
                user_id_obj
            )
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
    var options_commentform = {
        url: get_base_url() + 'rest/comment/',
        dataType: 'json',
        headers: auth_headers,
        beforeSubmit: function (data) {
            $('.spinner').show();
        },
        success: function (data) {
            $('.spinner').hide();
            get_update_comments(token);
            $('#sendcomment').find("input[type=text], textarea").val("");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('.spinner').hide();
            console.log('error returned from ' + url);
            alert_problem();
        },
    }

    function get_update_comments(token) {
        if ($('.commentinstance').length) {
            var last_comment = $('.commentinstance').last();
            var last_comment_id = $('.commentinstance').last().data('commentid');
        }
        else {
            var last_comment_id = '0'
        }
        var id = getUrlParameter('id');
        var url = get_base_url() + "rest/get_update_coments/" + id + "/" + last_comment_id + "/";
        var auth_headers = {
            Authorization: 'Token ' + token
        };
        var user_ajax_obj;
        user_ajax_obj = {
            url: url,
            dataType: 'json',
            headers: auth_headers,
            beforeSubmit: function (data) {
                $('.spinner').show();
            },
            success: function (data) {
                $.each(data, function (index, value) {
                    $(value.render_rest).delay(500 * index).hide().slideUp('fast').appendTo('#comment_list').slideDown("slow");
                });

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('error returned from ' + url);
                alert_problem();
            }
        };
        $.ajax(
            user_ajax_obj
        );
    }

    setInterval(function () {
            get_update_comments(token)
        }, config.wall_update_time
    )

    $(document).ready(function () {
        // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
        // $('.modal').modal('close');
        var success = getUrlParameter('success');

        if (success == "1") {
            $('#modal2').modal('open');
        }
    });
})
