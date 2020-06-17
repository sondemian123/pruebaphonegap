/**
 * Created by rodrigo on 1/6/17.
 */


$(function () {

    function readURL(input, showid) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('showid').attr('src', e.target.result).slideDown();
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    // access image size here
                    var w = this.width;
                    var h = this.height;
                    nh = 300 * h / w;
                    $('showid').css('height', nh + 'px').css('width', '300px');
                };
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#id_image_1").change(function () {
        readURL(this, '#smallImage');
    });
    $("#id_image_2").change(function () {
        readURL(this, '#smallImage2');
    });
    $("#id_image_3").change(function () {
        readURL(this, '#smallImage3');
    });
    $("#id_image_4").change(function () {
        readURL(this, '#smallImage4');
    });

    // $("#id_image").change(function () {
    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //             // get loaded data and render thumbnail.
    //             var smallImage = $("#smallImage");
    //             var src = e.target.result;
    //             smallImage.src = src;
    //             smallImage.slideDown();
    //         };
    //         // read the image file as a data URL.
    //         reader.readAsDataURL(this.files[0]);
    //     }
    // );


    function get_token() {
        if (localStorage.token) {
            return localStorage.token
        } else {
            window.location.href = 'index.html'
            return false
        }
    }


    // get users new content
    var token = get_token();
    if (token === false) {
        window.location.href = 'index.html'
    }
    // form stuff
    var url = get_base_url() + "rest/event/";
    var auth_headers = {
        Authorization: 'Token ' + token
    };


    var value;

    function gotohome() {
        window.location.href = 'index.html'
    }

    // var canpublishoptions = {
    //     url: get_base_url() + "rest/can_publish/",
    //     dataType: 'json',
    //     headers: auth_headers,
    //     success: 'check_can_publish'
    // }
    //


    function check_can_publish(data) {
        value = data;
        if (!value) {
            $('#disabled').slideDown();
            setTimeout(function () {
                window.location.href = 'index.html';
            }, 4000);

        }
    }

    // $.get(canpublishoptions);


    $.ajax({
        url: get_base_url() + "rest/can_publish/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Token ' + token);
        },
        success: check_can_publish
    });

    var options = {
        success: process_response,
        error: process_error,
        beforeSubmit: before_submit,
        url: get_base_url() + 'rest/event/',
        dataType: 'json',
        headers: auth_headers
    }


    function before_submit(formData, jqForm, options) {
        $("button[type=submit]").attr('disabled', 'disabled');
        $('.spinner').show();
        $("button[type=submit]").attr('disabled', 'disabled');
        $('#message').html('');
    }

    function process_response(responseText, statusText, xhr, $form) {
        url = responseText.get_rest_url;
        $('.spinner').hide();
        window.location.href = url + "&success=1"
    }

    function process_error(responseText, statusText, xhr, $form) {
        $('.spinner').hide();
        $('#message').html('Por favor intente nuevamente');
        $("button[type=submit]").prop("disabled", false);

    }

    $('#publish').ajaxForm(options);

    var options_categories = {
        url: get_base_url() + 'rest/get_categories/',
        dataType: 'json',
        headers: auth_headers,
        success: function (data) {
            $('#category_container').html(data);
            $('select').material_select();
        }
    };
    $.ajax(options_categories);

    $('.onlybazar').hide();
    $('.hideatfirst').hide();
    $("input[type=radio]").on("click", function () {
        type = $('input[name=type]:checked').val()
        if (type == 'bazar') {
            $('.onlybazar').slideDown();
            $('.hideatfirst').slideDown();
            $('select').prop('required', true);
            $('#publish').ajaxForm(options);
            $('#id_description').attr('placeholder', '¿Qué quieres vender o comprar?')
        }
        else {
            $('.onlybazar').slideUp();
            $('.hideatfirst').slideDown();

            $('select').prop('required', false);
            $('#publish').ajaxForm(options);
            $('#id_description').attr('placeholder', '¿Qué quieres contar?')

        }
    })

    var options_bancos_asesor = {
        url: get_base_url() + 'rest/get_bancos_asesor/',
        dataType: 'json',
        headers: auth_headers,
        success: function (data) {
            if (data) {
                $('.onlybazar').after(data)
            }
        }
    };
    $.ajax(options_bancos_asesor);

    var options_is_socia = {
        url: get_base_url() + 'rest/is_socia/',
        dataType: 'json',
        headers: auth_headers,
        success: function (data) {
            if (!data) { // no es socia
                // $('.radios').hide();
            }
        }
    };
    $.ajax(options_is_socia);


    $('#bottom-nav'
    ).delay('1000').animate({'bottom': '-=80px'}, 'slow')

    $('.img2').hide();
    $('.img3').hide();
    $('.img4').hide();
    $('#id_image_1').change(function () {
        $('.img2').show();
    })
    $('#id_image_2').change(function () {
        $('.img3').show();
    })
    $('#id_image_3').change(function () {
        $('.img4').show();
    })
});
