$(window).on("load", function () {
    //Preloader
    setTimeout("$('.page-loader div').fadeOut();", 200);
    setTimeout("$('.page-loader').delay(200).fadeOut('slow');", 200);
    setTimeout("jQuery('.preloader_hide, .selector_open').animate({'opacity' : '1'},500)", 200);
});
