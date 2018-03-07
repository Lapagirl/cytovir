$(document).ready(function () {


    //Intro section height
    function introHeight() {
        var sectionHeight = $(window).height();
        $('.intro').css('height', sectionHeight + 'px');
    }

    introHeight();
    $(window).resize(function () {
        introHeight();
    });


    //Scroll to section
    $('.sections-nav').click('li', function (event) {
        /*$(this).find('a').removeClass('active');
         $(event.target).addClass('active');*/
        event.preventDefault();
        var selector = $(event.target).attr('href');

        $('html, body').animate({
            scrollTop: $(selector).offset().top
        }, 1000);
    });


    //Switch the left menu-items on scroll
    function onScroll() {
        var menu_selector = $('.sections-nav');
        var scrollTop = $(document).scrollTop();
        menu_selector.find('a').each(function () {
            var hash = $(this).attr("href");
            var target = $(hash);
            if (target.offset().top <= scrollTop + 100 && target.offset().top + target.outerHeight() > scrollTop + 100) {
                menu_selector.find('a').removeClass("active");
                $(this).addClass("active");
            }
        });
    }

    $(window).scroll(function () {
        onScroll();
    });


    //Fixing the elements
    function fixingEl() {
        var sectionsNav = $('.sections-nav');
        var pageNav = $('.page-nav');
        var morningLeft = $('.title-left');
        var sharing = $('.share');


        var sectionsNavPos = sectionsNav.offset().top - sectionsNav.parent().css('top').substring(0, sectionsNav.parent().css('top').length - 2);
        // var pageNavPos = pageNav.offset().top - pageNav.parent().css('top').substring(0, pageNav.parent().css('top').length-2);
        var pageNavOffset = $(".intro").height();
        var morningLeftPos = morningLeft.offset().top - morningLeft.css('top').substring(0, morningLeft.css('top').length - 2);
        var sharePos = sharing.offset().top - sharing.css('top').replace('px', '');
        var scroll_top = Math.ceil($(document).scrollTop());

        if (scroll_top >= pageNavOffset) {
            sectionsNav.parent().addClass('fixed');
            pageNav.parent().addClass('fixed');
            morningLeft.addClass('fixed');
            sharing.addClass('fixed');

        } else {
            sectionsNav.parent().removeClass('fixed');
            pageNav.parent().removeClass('fixed');
            morningLeft.removeClass('fixed');
            sharing.removeClass('fixed');

        }

    }

    fixingEl();
    $(window).scroll(function () {
        fixingEl();
    });

});


(function () {

    var scroll_is_being_animated = false;


    $(window).on('mousewheel', function (e) {

        // var $this = $(this);
        var $body = $("html, body");

        var first_slide = $('.intro');

        if (scroll_is_being_animated) {
            e.preventDefault();
            return;
        }

        if ($body.scrollTop() >= first_slide.height()) {
            return;
        }

        if (e.originalEvent.wheelDelta < 0) { // Скролл вниз
            scroll_is_being_animated = true;
            $body.stop().animate({scrollTop: first_slide.height() + 10}, 500, function () {
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
        $('[data-bag_item=' + item_id + ']').siblings('.take').addClass('hidden');
    });

    $('.take, .take-1').click(function () {
        var $this = $(this);
        var bag = $('.js-bag');
        var item = $this.siblings('[data-bag_item]');

        var item_styles = {
            top: bag.offset().top - item.offset().top + item.position().top,
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
                x: item_styles.left,
                y: item_styles.top,
                angle: -100,
                length: .5
            }
        };

        item.animate({path: new $.path.bezier(bezier_params)}, 1000, function () {
            if ($this.is('.take-1 ')) {
                location.href = $(".next-page-link").attr('href');
            }
        });

        var item_id = item.data('bag_item');

        if (!item_id) {
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

        var scroll_top = $("html, body").scrollTop();
        var win_height = $(window).height();

        var intro_height = intro.height();
        var max = $('body').height() - intro_height - win_height;
        var current = scroll_top - intro_height;

        var scaleX = (current / max );

        page_scroll_progress.css({transform: "skewX(-40deg) scaleX(" + scaleX + ")"});


        var visible_min = scroll_top + (win_height * .75);
        // var visible_max = scroll_top + (win_height * .25);

        $('.striped-circle').each(function () {

            var offset_top = $(this).offset().top;

            if (offset_top < visible_min) {// && offset_top > visible_max
                $(this).addClass('show');
                return;
            }

            $(this).removeClass('show');
        })
    });

});

jQuery(function () {

    var share = Ya.share2('share', {
        theme: {
            copy: "hidden",
            bare: true,
            services: "vkontakte,facebook,twitter"
        },
        hooks: {
            onready: function () {
                $(".ya-share2__item_service_vkontakte .ya-share2__icon").html('<i class="fab fa-vk"></i>');
                $(".ya-share2__item_service_facebook .ya-share2__icon").html('<i class="fab fa-facebook-f"></i>');
                $(".ya-share2__item_service_twitter .ya-share2__icon").html('<i class="fab fa-twitter"></i>');
            }
        }
    });

});