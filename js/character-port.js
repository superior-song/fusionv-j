
(function($) {
    //轮播图
    var mySwiper = new Swiper ('#screen-box', {
        direction : 'horizontal',
        loop:true,
        slidesPerView : 2,
        spaceBetween : 0,
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
    
})(jQuery);