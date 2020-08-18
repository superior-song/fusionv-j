(function($) {
    // 导航设置
    $('.el-menu-demo>.el-submenu').on('click', function(){
        $(this).siblings().removeClass('is-active')
    })
})(jQuery);