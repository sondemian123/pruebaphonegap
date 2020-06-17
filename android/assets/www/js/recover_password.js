$(function () {


    // get users new content

    var options = {
        url: get_base_url() + "rest/recover_password/",
        dataType: 'json',
        success: function (data) {
            $('.spinner').hide();
            $('#result').html(data);
        },
        error:

            function (XMLHttpRequest, textStatus, errorThrown) {
                $('.spinner').hide();
                console.log('error returned');
                alert_problem();
            }
        ,
        beforeSubmit: function () {
            $('.spinner').show();
        }
    };
    $('#recover_password').ajaxForm(options);
})



