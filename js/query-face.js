(function($) {
    // 排序状态切换
    /*$('.btn-sort-group span').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
    })*/

    // 轮播图
    setSwiper();

    function setSwiper() {
        var mySwiper1 = new Swiper('#screen-box1', {
            direction: 'horizontal',

            slidesPerView: 1,
            calculateHeight: true
        });

        var mySwiper2 = new Swiper('#screen-box2', {
            direction: 'horizontal',
            slidesPerView: 'auto',
            spaceBetween: 8,
            calculateHeight: true
        });
        
        var mySwiper3 = new Swiper('#screen-box', {
            direction: 'horizontal',
            slidesPerView: 'auto',
            spaceBetween: 8,
            calculateHeight: true
        });
        $('.face-view1 .arrow-left').on('click', function(e) {
            e.preventDefault();
            mySwiper1.swipePrev();
        });
        $('.face-view1 .arrow-right').on('click', function(e) {
            e.preventDefault();
            mySwiper1.swipeNext();
        });
        $('.face-view2 .arrow-left').on('click', function(e) {
            e.preventDefault();
            mySwiper2.swipePrev();
        });
        $('.face-view2 .arrow-right').on('click', function(e) {
            e.preventDefault();
            mySwiper2.swipeNext();
        });
        $('.caro-view .arrow-left').on('click', function(e) {
            e.preventDefault();
           console.log("arrow-left");
            dbArrows("left");
        });
        $('.caro-view .arrow-right').on('click', function(e) {
            e.preventDefault();
            console.log("arrow-right");
            dbArrows("right");
        });
    }
    
    // 初始化弹窗位置
    function initBoxPos(box) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var boxW =  box.offsetWidth;
        var boxH =  box.offsetHeight;
        box.style.left = (winW - boxW) / 2 + 'px';
        box.style.top = (winH - boxH) / 2 + 'px';
    }
    
    // 弹出窗任意拖动
    function dragBox(box){
        box.onmousedown = function(e){
            var e = e || window.event;
            
            // 获取鼠标点击位置相对于弹窗left和top的位移
            var diffX = e.clientX - box.offsetLeft;
            var diffY = e.clientY - box.offsetTop;

            // 鼠标移动事件
            document.onmousemove = function(e) {
                var e = e || window.event;
                
                //根据鼠标点击位置相对于弹窗的位移来计算弹窗当前的left,top值
                var left = e.clientX - diffX;
                var top = e.clientY - diffY;
                
                if(left < 0) {
                    left = 0;
                } else if(left > window.innerWidth - box.offsetWidth){
                    left = window.innerWidth - box.offsetWidth;
                }

                if(top < 0) {
                    top = 0;
                } else if(top > window.innerHeight - box.offsetHeight){
                    top = window.innerHeight - box.offsetHeight;
                }

                box.style.left = left + 'px';
                box.style.top = top + 'px';
                console.log(box.style.left);
            }

            document.onmouseup = function() {
                this.onmousemove = null;
                this.onmouseup = null;
            }
        }
        
    }
    // 底库查询列表-查看详情
    $('.res-list-dk li').on('click', function() {
        $('.box-detail-face').removeClass('disnone');
        setSwiper();

        var wrapbox = document.getElementsByClassName('msg-wrap')[0];
        initBoxPos(wrapbox);
        dragBox(wrapbox);
    });

    // 查询库状态切换
    $('.list-query-gj .item-query-gj').on('click', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
    });

    // 选择
    $('.check-item').on('click', function(){
        $(this).toggleClass('checked');
    })

    // 选中当前项
    $('.res-list .res-list-item').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 滚动条设置
    function showScroll() {
        // 判断niceScroll插件是否存在
        if(!$('.query-res-cont').niceScroll) return;
        $('.query-res-cont').niceScroll({
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