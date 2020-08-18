(function($) {
    // 防控圈点击收起
    $('.btn-look').on('click', function() {
        var $this = $(this);
        var $ico = $this.find('i');
        var $list = $this.next('.index-down-list');
        var listW = $list.width();
        if (listW > 0) {
            $list.animate({ width: 0 }, 200, function() {
                $list.css({ overflow: 'hidden' });
            });
            $ico.addClass('sq');
        } else {
            $list.animate({ width: '100%' });
            $ico.removeClass('sq');
        }
    })

    // 地图模式切换
    $('.switch-map .switch-item').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });

    //消息推送 关闭
    $('.btn-close-msg, .btn-opt-cancel').on('click', function() {
        $('.message-push').fadeOut();
    });

    // 左下角导航
    var button = document.getElementById('cn-button'),
        wrapper = document.getElementById('cn-wrapper');
    var open = false;
    button.addEventListener('click', handler, false);
    wrapper.addEventListener('click', cnhandle, false);

    function cnhandle(e) {
        e.stopPropagation();
    }

    function handler(e) {
        if (!e) var e = window.event;
        e.stopPropagation();

        if (!open) {
            openNav();
        } else {
            closeNav();
        }
    }

    function openNav() {
        open = true;
        classie.add(wrapper, 'opened-nav');
    }

    function closeNav() {
        open = false;
        classie.remove(wrapper, 'opened-nav');
    }
    // document.addEventListener('click', closeNav);

    // 列表控制
    $('.btn-list-up, .btn-list-jrzp').on('click', function() {
        var listGj = $('.list-gjjl');
        var listZp = $('.list-jrzp');

        if (!listGj.is(':hidden') && listZp.is(':hidden')) {
            listGj.slideUp();
            listZp.slideDown();
        }
    });

    $('.btn-list-down, .btn-list-gjjl').on('click', function() {
        var listGj = $('.list-gjjl');
        var listZp = $('.list-jrzp');

        if (listGj.is(':hidden') && !listZp.is(':hidden')) {
            listZp.slideUp();
            listGj.slideDown();
        }
    });
    
    // 图片详情关闭
    $(document).on('click', function(e){
        var target = $(e.target);
        var _img1 = $('.img-detail-01');
        var _img2 = $('.img-detail-02');
        var _list = $('.bdsug');

        if(target.closest('.img-detail-01').size() <= 0 && target.closest('.img-box').size() <= 0 && !_img1.is(':hidden')) {
            
            _img1.addClass('disnone');
            
        }

        if(target.closest('.img-detail-02').size() <= 0 && target.closest('.img-box').size() <= 0 && !_img2.is(':hidden')) {
            
            _img2.addClass('disnone');
            
        }

        if(target.closest('.bdsug').size() <= 0 && target.closest('.index-search').size() <= 0 && !_list.is(':hidden')) {
            
            _list.slideUp();
            
        }
    })

    // 技战法
    $('#cn-wrapper li a').hover(function(){
        console.log('11');
    },function(){
        console.log('22');
    });

    // 模糊搜索
    $('.index-search .el-input input').on('focus', function(){
        $('.bdsug').slideDown()
    });

    // 选中当前项
    $('.btn-sort-group span').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
})(jQuery);