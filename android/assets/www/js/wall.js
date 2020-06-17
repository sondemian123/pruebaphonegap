$(function () {
    $('#u').html(get_base_url() + "|" + config.version)
    var busy = false;

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
    var pos = getUrlParameter('pos');

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

        alert('error 2');
        window.location.href = 'index.html'
    }
    var highest_id = 0;

    function get_wall_content(token) {
        if (busy) {
            return false
        }
        busy = true;
        $('.spinner').show();
        var url = get_base_url() + "rest/get_wall_content/" + config.version + "/";
        if (pos) {
            url += "?pos=" + pos
        }

        var auth_headers = {
            Authorization: 'Token ' + token
        };
        var user_ajax_obj = {
            url: url,
            dataType: 'json',
            headers: auth_headers,
            success: function (data) {
                var savepos = pos;
                pos = '';
                if (data == 'change_password') {
                    window.location.href = 'change_password.html'
                }
                if (data == 'add_email') {
                    window.location.href = 'add_email.html'
                }
                if (data == 'accept_conditions') {
                    window.location.href = 'accept_conditions.html'
                }
                if (data == 'answer_poll') {
                    window.location.href = 'answer_poll.html'
                }
                $('.spinner').hide();

                console.log('authorized user returned');
                //$(data).hide().prependTo('#main_wall').fadeIn("slow");
                // if (data.length > 0) {
                //     highest_id = data[data.length - 1]
                // }
                ;

                if (savepos) {
                    $.each(data, function (index, value) {
                        $(value).prependTo('#main_wall');
                    });
                    daid = 'eventbox' + savepos;
                    document.getElementById(daid).scrollIntoView(true);

                } else {
                    $.each(data, function (index, value) {
                        $(value).delay(100 * index).hide().slideUp('fast').prependTo('#main_wall').slideDown("slow");
                    })
                }
                if (data.length == 0) {
                    $('#main_wall').html("<p><center><strong>No hay mensajes aún. <br>¡Dale, <a href='publicar.html'>publica tu primer mensaje</a></strong>!</center></p>")
                }
                setTimeout(function () {
                        get_update_content(token)
                    }, config.wall_update_time
                )
                // $('#main_wall').append(data)
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
        busy = false;
    }

    get_wall_content(token);


    function get_update_content(token) {
        if (busy) {
            return false
        }
        busy = true;
        var url = get_base_url() + "rest/get_update_content/" + highest_id + "/";
        var auth_headers = {
            Authorization: 'Token ' + token
        };
        var user_ajax_obj;
        user_ajax_obj = {
            url: url,
            dataType: 'json',
            headers: auth_headers,
            success: function (data) {
                if (data.length > 0) {
                    highest_id = data[data.length - 1]
                }
                ;
                $.each(data.slice(0, -1), function (index, value) {
                    $(value).delay(500 * index).hide().slideUp('fast').prependTo('#main_wall').slideDown("slow");
                });
                setTimeout(function () {
                        get_update_content(token)
                    }, config.wall_update_time
                )
                // $('#main_wall').prepend(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('error returned from ' + url);
                alert_problem();
            }
        };
        $.ajax(
            user_ajax_obj
        );
        busy = false;
    }

    get_update_content(token);


    function get_bottom_content(token) {
        if (busy) {
            return false
        }
        busy = true;
        if ($('.eventinstance').length) {
            var last_event = $('.eventinstance').last();
            var last_event_id = $('.eventinstance').last().data('eventid');
        } else {
            var last_event_id = '0'
        }
        var url = get_base_url() + "rest/get_bottom_content/" + last_event_id + "/";
        var auth_headers = {
            Authorization: 'Token ' + token
        };
        var user_ajax_obj;

        user_ajax_obj = {
            url: url,
            dataType: 'json',
            headers: auth_headers,
            success: function (data) {
                $.each(data, function (index, value) {
                    $(value).delay(500 * index).hide().slideUp('fast').appendTo('#main_wall').slideDown("slow");
                })

                // $('#main_wall').prepend(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert_problem()
                console.log('error returned from ' + url);
                alert_problem();
            }
        };
        $.ajax(
            user_ajax_obj
        );
        busy = false;
    }

    $(window).scroll(function () {
        console.log($(window).scrollTop() + ' | ' + $(window).height() + " | " + $(document).height());
        console.log(($(window).scrollTop() + $(window).height() >= $(document).height() - 50));
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 50) {
            get_bottom_content(token);
        }
    });


    $('body').on('click', 'a.event', function () {
        var pk = $(this).data('pk');
        window.history.pushState('obj', 'newtitle', 'wall.html?pos=' + pk);
    });

    $('#search').change(function () {
        var cont = this.value;
        if (cont.startsWith('/url:')) {
            if (cont.endsWith('/')) {
                var value = cont.slice(5,-1);
                process_base_url_string(value);
                alert('se cambió url a: '+value)
            }
        }
    })

});
