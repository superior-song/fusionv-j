			 
			$("div[id^='content_']").css({'overflow':'hidden'});
          
			$("div[id^='content_']").niceScroll({
                cursorcolor: "#02E2FC",//#CC0071 光标颜色
                cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
                touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
                cursorwidth: "9px", //像素光标的宽度
                cursorborder: "0", // 	游标边框css定义
                cursorborderradius: "9px",//以像素为光标边界半径
                autohidemode: false //是否隐藏滚动条

            });
		
