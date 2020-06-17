$(function () {
    document.getElementById("id_image").onchange = function () {
        var reader = new FileReader();

        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            document.getElementById("image").src = e.target.result;
        };

        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    };

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
    var profile_url;
    var user_id;
    var form_options;
    if (token === false) {
        window.location.href = 'index.html'
    }
    function get_user_info(token) {
        var url = get_base_url() + "rest/get_user_info/";
        var auth_headers = {
            Authorization: 'Token ' + token
        };
        var user_ajax_obj = {
            url: url,
            dataType: 'json',
            headers: auth_headers,
            success: function (data) {
                user_id = data['id'];
                var profile_url = data['profile_url'];
                $('#user_photo').attr('src', data['image_cropped']);
                $('#nombre_usuario').html(data['title']);
                $('#titlefield').val(data['title']);
                form_options = {
                    success: process_response,
                    error: process_error,
                    url: get_base_url() + 'rest/person/' + user_id + "/",
                    dataType: 'json',
                    headers: auth_headers,
                    method: "PATCH"
                }
                $('#publish').ajaxForm(form_options);

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

    var auth_headers = {
        Authorization: 'Token ' + token
    };

    function get_user_id() {
        return user_id
    }


    function process_response(responseText, statusText, xhr, $form) {
        location.reload();
    }

    function process_error(responseText, statusText, xhr, $form) {
        $('#message').html('Por favor intente nuevamente')
    }

})
