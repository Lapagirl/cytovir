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
    var morningLeft = $('.morning-left');


    var sectionsNavPos = sectionsNav.offset().top - sectionsNav.parent().css('top').substring(0, sectionsNav.parent().css('top').length - 2); //delete px from the received value
    var pageNavPos = pageNav.offset().top - pageNav.parent().css('top').substring(0, pageNav.parent().css('top').length - 2);
    var morningLeftPos = morningLeft.offset().top - morningLeft.css('top').substring(0, morningLeft.css('top').length - 2);

    function fixingElements() {

    }

    $(window).scroll(function () {
        if ($(document).scrollTop() >= sectionsNavPos) {
            sectionsNav.parent().addClass('fixed');

        } else {
            sectionsNav.parent().removeClass('fixed');
        }

        if ($(document).scrollTop() >= pageNavPos) {
            pageNav.parent().addClass('fixed');
        } else {
            pageNav.parent().removeClass('fixed');
        }

        if ($(document).scrollTop() >= morningLeftPos) {
            morningLeft.addClass('fixed');
        } else {
            morningLeft.removeClass('fixed');
        }
    });

});


(function () {

    var scroll_is_being_animated = false;
    var last_scrollTop = 0;


    $(window).scroll(function (e) {
        var $this = $(this);
        var $body = $("html, body");

        if (scroll_is_being_animated) {
            e.preventDefault();
            return;
        }

        if ($this.scrollTop() > $this.height() || scroll_is_being_animated) {
            last_scrollTop = $this.scrollTop();
            return;
        }

        if ($this.scrollTop() > last_scrollTop) { // Скролл вниз
            scroll_is_being_animated = true;
            $body.stop().animate({scrollTop: $(window).height() + 100}, 350, 'swing', function () {
                scroll_is_being_animated = false;
            });
        }
        else if ($this.scrollTop() < last_scrollTop) { // Скролл вверх
            scroll_is_being_animated = true;
            $body.stop().animate({scrollTop: 0}, 350, 'swing', function () {
                scroll_is_being_animated = false;
                last_scrollTop = 0;
            });
        }


        last_scrollTop = $this.scrollTop();


    });

})();


jQuery(function () {

    var storage = localStorage;

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
            top: bag.offset().top - item.offset().top + item.position().top - 100,
            left: bag.offset().left - item.offset().left + item.position().left
        };

        item.addClass('animate');
        $this.addClass('hidden');

        item.animate(item_styles, 1000, function () {
            if ($this.is('.take-1 ')) {
                location.href = $(".next-page-link").attr('href');
            }
        });

        var item_id = item.data('bag_item');

        if(!item_id){
            throw new Error('no item id');
        }

        taked_items.push(item_id);
        storage.setItem('taked_items', JSON.stringify(taked_items));
    });

    $(".next-page-link").click(function (e) {
        var current_cytovir_id = $('.cytovir[data-bag_item]').data('bag_item');

        if (!current_cytovir_id) {
            throw  new Error('No cytovir item on current page');
        }

        if (taked_items.indexOf(current_cytovir_id) == -1) {
            e.preventDefault();
            $('.popup').addClass('show');
        }
    });
});