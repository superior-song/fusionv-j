(function($) {
    //轮播图
    var mySwiper = new Swiper('#screen-box3', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 8,
        calculateHeight: true
    });
    $('.arrow-left').on('click', function(e) {
        e.preventDefault();
        mySwiper.swipePrev();
    });
    $('.arrow-right').on('click', function(e) {
        e.preventDefault();
        mySwiper.swipeNext();
    });

    //对比
    $('.chart-compare').easyPieChart({
        animate: 3000,
        barColor: '#00ffff',
        lineWidth: 8,
        scaleColor: '#00ffff',
        size: 140,
        scaleLength: 0,
        easing: 'easeOutBounce',
        onStep: function(from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent) + '%');
        }
    });

    var chart = window.chart = $('.chart-compare').data('easyPieChart');
    // 设置外围圆圈的旋转时间
    var xzTime = 3;
    // 开始对比点击
    $('.btn-compare').off('click').on('click', function() {
        var _this = $(this);

        _this.addClass('active');   
        chart.update(Math.random() * 100);
        
        $('.bg-circle-1, .bg-circle-3').css({animation: 'rotateCiecle1 '+ xzTime +'s'});
        $('.bg-circle-2, .bg-circle-4').css({animation: 'rotateCiecle2 '+ xzTime +'s'});
        
        setTimeout(function(){
            $('.bg-circle-1, .bg-circle-3').css({animation: ''});
            $('.bg-circle-2, .bg-circle-4').css({animation: ''});
            _this.removeClass('active');
        }, 3000)
    });
})(jQuery);