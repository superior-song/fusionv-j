
(function($) {
    //轮播图
    var mySwiper = new Swiper ('#screen-box2', {
        direction : 'horizontal',
        loop:true,
        slidesPerView : 1,
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

    // 列表展示选中
    $('.list-display-item').on('click', function(e){
       $(this).addClass('active').siblings().removeClass('active');
    });
    $('.btn-check').on('click', function(e){
        $(this).toggleClass('checked')
     });

     // 滚动条设置
    function showScroll() {
        // 判断niceScroll插件是否存在
        if(!$('.list-display').niceScroll) return;
        $('.list-display').niceScroll({
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