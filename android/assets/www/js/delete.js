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
        var id = getUrlParameter('id');

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
            url: get_base_url() + 'rest/delete/' + id + "/",
            dataType: 'json',
            headers: auth_headers,
             beforeSubmit: function (data) {
                $('.spinner').show();
            },
            success: function (data) {
                $('.spinner').hide();
                window.location.href = "wall.html";
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('error returned');
                alert_problem();
            }
        }
        $('#deletebutton').click(function () {
            $.ajax(
                user_ajax_obj
            )
        })

    }
)

