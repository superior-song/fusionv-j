
(function($) {
    //轮播图
    var mySwiper = new Swiper ('#screen-box', {
        direction : 'horizontal',
        loop:true,
        slidesPerView : 9,
        spaceBetween : 8,
        autoplay: 0,
        autoplayDisableOnInteraction:true
    });
    $('.arrow-left').on('click', function(e){
        e.preventDefault();
        mySwiper.swipePrev();
      });
    $('.arrow-right').on('click', function(e){
        e.preventDefault();
        mySwiper.swipeNext();
    });

    // 滚动条设置
    function showScroll() {
        // 判断niceScroll插件是否存在
        if(!$('.menu-scroll').niceScroll) return;
        $('.menu-scroll').niceScroll({
            cursorcolor:'rgb(34, 113, 132)',
            cursorwidth: '4', 
            cursorborderradius: '20', 
            cursoropacitymin: '0',
            cursorborder: '0',
            hidecursordelay: 800,
            horizrailenabled:true,
            background: '',
            cursorfixedheight:'80'
        });
    }
    showScroll();
})(jQuery);