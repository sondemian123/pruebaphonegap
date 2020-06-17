/**
 * Created by rodrigo on 1/6/17.
 */

$(function () {
    // $('.spinner').show();


    var url = get_base_url() + 'rest/loginfeedback/';



    var options_commentform = {
        url: url,
        dataType: 'json',
        beforeSubmit: function (data) {
            $('.spinner').show();
        },
        success: function (data) {
            $('.spinner').hide();
            $('input').val("");
            $('#message').val("");
            $('#result').html(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('.spinner').hide();
            console.log('error returned from ' + url);
            alert_problem();
        },
    }

    $('#messageform').ajaxForm(options_commentform);

})
