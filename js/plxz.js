(function($) {
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