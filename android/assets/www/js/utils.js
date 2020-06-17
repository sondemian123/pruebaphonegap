function get_auth_headers() {
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
    return auth_headers
}

function getUrlParameter(sParam) {
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