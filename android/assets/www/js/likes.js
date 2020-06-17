$(function () {
    function get_token() {
        if (localStorage.token) {
            return localStorage.token
        } else {
            window.location.href = 'index.html'
            return false
        }
    }

    $(document).on('click', '.like', function () {
            var id = $(this).data('id');
            var item = $(this);
            var token = get_token();
            var url = get_base_url() + "rest/add_like/" + id + "/";
            var auth_headers = {
                Authorization: 'Token ' + token
            };
            user_ajax_obj = {
                url: url,
                dataType: 'json',
                headers: auth_headers,
                success: function (data) {
                    item.removeClass('like-inactive').addClass('like-active')
                    item.find('.countlikes').html(data);
                    // $('.content').html('¡Gracias!');
                    // $('.modal').modal('open');

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log('error returned from ' + url);
                    alert_problem();
                }
            }
            $.ajax(
                user_ajax_obj
            );
            return false;
        }
    )
    $('.modal').modal();
    $(document).on('click', '.wantobuy', function () {
            var id = $(this).data('id');
            var item = $(this);
            var token = get_token();
            var url = get_base_url() + "rest/add_wantotobuy/" + id + "/";
            var auth_headers = {
                Authorization: 'Token ' + token
            };
            user_ajax_obj = {
                url: url,
                dataType: 'json',
                headers: auth_headers,
                success: function (data) {
                    item.removeClass('wantobuy-inactive').addClass('wantobuy-active');
                    item.find('.countwants').html(data);
                    $('.content').html('<p>¡Estás interesado(a) en esta publicación! </p><p>Haz clic para saber más detalles del contacto </p>');
                    $('.modal').modal('open');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log('error returned from ' + url);
                    alert_problem();
                }
            }
            $.ajax(
                user_ajax_obj
            );
            return false;
        }
    )
})