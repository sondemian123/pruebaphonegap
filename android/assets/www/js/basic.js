function get_token() {
    if (localStorage.token) {
        return localStorage.token
    } else {
        window.location.href = 'index.html';
        return false
    }
}

function get_base_url() {
    if (localStorage.base_url) {
        return localStorage.base_url
    } else {
        return config.base_url
    }
}

function set_base_url(url) {
    localStorage.base_url = url
}

function process_base_url_string(str) {
    switch (str) {
        case 'prod':
            set_base_url('http://190.8.83.245:81/');
            break;
        case 'test':
            set_base_url('http://somos.aw2.webfactional.com/');
            break;
        case 'local':
            set_base_url('http://127.0.0.1:8002/');
            break;
        default:
            set_base_url(str)
    }
}

function check_can_publish(data) {
    value = data;
    if (!value) {
        $('.publicar').click(function (e) {
            e.preventDefault();
        });
        $('.publicar').addClass('disabled')

    }
}

var token = get_token();

$.ajax({
    url: get_base_url() + "rest/can_publish/",
    type: "GET",
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Token ' + token);
    },
    success: check_can_publish
});

var alerted = false;

function alert_problem() {
    if (alerted != true) {

        Materialize.toast(
            '<img  src="dist/img/report.png" class="newicon"> ' +
            '¡Tenemos un problema de conexión con el servidor! ' +
            '<br> Por favor intenta nuevamente en unos momentos.',
            4000,
            'toasty'
        )
        alerted = true;
    }

}

$(function () {
        function get_token() {
            if (localStorage.token) {
                return localStorage.token
            } else {
                window.location.href = 'index.html'
                return false
            }
        }

        // get users info
        var token = get_token();
        if (token === false) {
            window.location.href = 'index.html'
        }
        var auth_headers = {
            Authorization: 'Token ' + token
        };

        function get_user_info(token) {
            var url = get_base_url() + "rest/get_user_info/";

            var user_ajax_obj = {
                url: url,
                dataType: 'json',
                headers: auth_headers,
                success: function (data) {
                    var profile_url = data['profile_url'];
                    $('#perfil_link').attr('href', profile_url);
                    $('#user_photo').attr('src', data['image'])
                    $('#nombre_usuario').html(data['title'])
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

        get_user_info(token);
        //
        var messages_ajax_obj = {
            url: get_base_url() + "rest/get_message_count/",
            dataType: 'json',
            headers: auth_headers,
            success: function (data) {
                $('.messages').html(data)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('error returned from ' + url);
                alert_problem();
            }
        };

        function get_message_count() {
            $.ajax(
                messages_ajax_obj
            );
            setTimeout(get_message_count, 30000)
        }

        setTimeout(get_message_count, 1000)
    }
)




