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



(function () {

    var scroll_is_being_animated = false;


    $(window).on('mousewheel',function (e) {

        // var $this = $(this);
        var $body = $("html, body");

        var first_slide = $('.intro');

        if (scroll_is_being_animated) {
            e.preventDefault();
            console.log(1);
            return;
        }

        if ($body.scrollTop() > first_slide.height()) {
            return;
        }

        if (e.originalEvent.wheelDelta < 0) { // Скролл вниз
            scroll_is_being_animated = true;
            $body.stop().animate({scrollTop: $(window).height()+50}, 500, function () {
                scroll_is_being_animated = false;
            });
        }
        else if (e.originalEvent.wheelDelta > 0) { // Скролл вверх
            scroll_is_being_animated = true;
            $body.stop().animate({scrollTop: 0}, 500, 'swing', function () {
                scroll_is_being_animated = false;
            });
        }
        e.preventDefault();


    });

})();


jQuery(function () {

    var storage = sessionStorage;

    var taked_items = [];

    var storage_data = storage.getItem('taked_items');

    if (storage_data) {
        taked_items = JSON.parse(storage_data);
    }
    taked_items.forEach(function (item_id) {
        $('[data-bag_item='+item_id+']').siblings('.take').addClass('hidden');
    });

    $('.take, .take-1').click(function () {
        var $this = $(this);
        var bag = $('.js-bag');
        var item = $this.siblings('[data-bag_item]');

        var item_styles = {
            top: bag.offset().top - item.offset().top + item.position().top ,
            left: bag.offset().left - item.offset().left + item.position().left
        };

        item.addClass('animate');
        $this.addClass('hidden');



        var bezier_params = {
            start: {
                x: item.position().left,
                y: item.position().top,
                angle: 50
            },
            end: {
                x:item_styles.left,
                y:item_styles.top,
                angle: -100,
                length: .5
            }
        };

        item.animate({path : new $.path.bezier(bezier_params)}, 1000);

        // item.animate(item_styles, 1000, function () {
        //     if ($this.is('.take-1 ')) {
        //         location.href = $(".next-page-link").attr('href');
        //     }
        // });

        var item_id = item.data('bag_item');

        if(!item_id){
            throw new Error('no item id');
        }

        taked_items.push(item_id);
        storage.setItem('taked_items', JSON.stringify(taked_items));
    });

    $(".next-page-link").click(function (e) {

        if (window.matchMedia('(max-width: 1199px)').matches) {
            return;
        }

        var current_cytovir_id = $('.cytovir[data-bag_item]').data('bag_item');

        if (!current_cytovir_id) {
            throw  new Error('No cytovir item on current page');
        }

        if (taked_items.indexOf(current_cytovir_id) === -1) {
            e.preventDefault();
            $('.popup').addClass('show');
        }
    });
});

jQuery(function () {
    var intro = $(".intro");
    var page_scroll_progress = $(".page-scroll-progress");
    $(window).on('scroll', function (e) {
        var intro_height = intro.height();
        var max = $('body').height() - intro_height - $(window).height();
        var current = $("html, body").scrollTop() - intro_height;

        var scaleX = (current / max );

        page_scroll_progress.css({transform: "skewX(-40deg) scaleX("+scaleX+")"});
    });

});