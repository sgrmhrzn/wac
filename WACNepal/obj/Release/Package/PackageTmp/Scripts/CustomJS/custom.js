$(function () {
    $('nav').data('size', 'big');
});

$(window).scroll(function () {
    if ($(document).scrollTop() > 0) {
        if ($('nav').data('size') == 'big') {
            $('nav').data('size', 'small');

            $('nav').stop().animate({
                height: '55px'
            }, 200);
            $('#logo img').stop().animate({
                height: '60px',width:"60px"
            }, 200);

            $('#static-menu').stop().animate({
                width: '720px',
            }, 200);

            $('#logo').stop().animate({
                height: '65px', width: "60px", margin:'0px auto'
            }, 200);
            $('#static-menu li').stop().animate({
                padding: '20px auto 0px auto',
            }, 200);

            $('.dropdown-content').stop().animate({
                top: '57px'
            }, 200);
            $('.inner-menu').stop().hide({
                top: '40px'
            }, 200);
           
        }
    }
    else {
        if ($('nav').data('size') == 'small') {
            $('nav').data('size', 'big');
            $('nav').stop().animate({
                height: '80px'
            }, 200);

            $('#logo img').stop().animate({
                height: '95px', width: "95px"
            }, 200);

            $('#static-menu').stop().animate({
                width: '750px',
            }, 200);

            $('#logo').stop().animate({
                height: '100px', width: "95px", margin: '-20px auto'
            }, 200);
            $('#static-menu li').stop().animate({
                padding: '20px auto 0px auto',
            }, 200);
            $('.dropdown-content').stop().animate({
                top: '60px'
            }, 200);
            $('.inner-menu').stop().show({
                top: '40px'
            }, 200);
            
        }
    }
});