$(document).ready(function() {

    //Intro section height
    function introHeight() {
        var sectionHeight = $(window).height();
        $('.intro').css('height', sectionHeight + 'px');
    }

    introHeight();
    $(window).resize(function() {
        introHeight();
    });



    //Scroll to section
    $('.sections-nav').click('li', function (event) {
        /*$(this).find('a').removeClass('active');
        $(event.target).addClass('active');*/

        var selector = $(event.target).attr('href');

        $('html, body').animate({
            scrollTop: $(selector).offset().top
        }, 1000);
    });


    //Switch the left menu-items on scroll
    function onScroll(){
        var menu_selector = $('.sections-nav');
        var scrollTop = $(document).scrollTop();
        menu_selector.find('a').each(function(){
            var hash = $(this).attr("href");
            var target = $(hash);
            if (target.position().top <= scrollTop && target.position().top + target.outerHeight() > scrollTop) {
                menu_selector.find('a').removeClass("active");
                $(this).addClass("active");
            }
        });
    }

    $(window).scroll(function () {
        onScroll();
    });


    //Fixing the elements
/*    var windowHeight = $(window).height();*/
    var sectionsNav = $('.sections-nav');
    var pageNav = $('.page-nav');
    var morningLeft = $('.title-left');
    var sharing = $('.share');


    var sectionsNavPos = sectionsNav.offset().top - sectionsNav.parent().css('top').substring(0, sectionsNav.parent().css('top').length-2);
    var pageNavPos = pageNav.offset().top - pageNav.parent().css('top').substring(0, pageNav.parent().css('top').length-2);
    var morningLeftPos = morningLeft.offset().top - morningLeft.css('top').substring(0, morningLeft.css('top').length-2);
    var sharePos = sharing.offset().top - sharing.css('top').replace('px', '');


    $(window).scroll(function () {
        if($(document).scrollTop() >= sectionsNavPos) {
            sectionsNav.parent().addClass('fixed');

        } else {
            sectionsNav.parent().removeClass('fixed');
        }

        if($(document).scrollTop() >=  pageNavPos) {
            pageNav.parent().addClass('fixed');
        } else {
            pageNav.parent().removeClass('fixed');
        }

        if($(document).scrollTop() >=  morningLeftPos) {
            morningLeft.addClass('fixed');
        } else {
            morningLeft.removeClass('fixed');
        }

        if($(document).scrollTop() >=  sharePos) {
            sharing.addClass('fixed');
        } else {
            sharing.removeClass('fixed');
        }
    });

});