var ui = {
		//loading(目标覆盖区域不填则为body,loading提示文字,是否遮罩模态层true or false)
		loading: function(target,cont,model) {
			if(target==''){
				target='body';
			}
			if(cont==null){
				cont='加载中...';
			}
			if(model==false){
				loading_model_html = "";
			}else{
				loading_model_html = "<div class='ui_loading_model'></div>";
			}
			loading_html = "<div class='ui_loading'><div class='cont' id='ui_cont' name='ui_cont'>"+cont+"</div></div>";
			//将代码片段加入页面中
			$('body').append(loading_html);
			$('body').append(loading_model_html);
			//获取目标容器的宽高，以计算loading尺寸与坐标		
			var target_width = $(target).width();
			var target_height = $(target).height();
			//设置模态层尺寸与坐标
			$('.ui_loading_model').width(target_width);
			$('.ui_loading_model').height(target_height);
			var loading_left = $(target).offset().left; 
			var loading_top =  $(target).offset().top; 
			$('.ui_loading_model').css('left',loading_left+'px');
			$('.ui_loading_model').css('top',loading_top+'px');
			//设置loading内容的坐标
			var ui_loading_width = $('.ui_loading').width();
			var ui_loading_height = $('.ui_loading').height();
			var ui_loading_left = target_width/2 + loading_left - ui_loading_width/2-20;
			var ui_loading_top = target_height/2 + loading_top  - ui_loading_height/2-20;
			$('.ui_loading').css('left',ui_loading_left+'px');
			$('.ui_loading').css('top',ui_loading_top+'px');
			//console.log(target);
			//console.log(target_width+'+'+target_height+'+'+ui_loading_left+'+'+ui_loading_top);
			//显示与销毁loading
			$('.ui_loading').fadeIn('fast');
			$('.ui_loading_model').fadeIn('fast');
			 
		},
		setText:function(cont){//修改显示文本
			if(cont!=null){
				document.getElementById("ui_cont").innerHTML=cont;
			}
		},
		//销毁loading
		loading_close: function() {
			$('.ui_loading').fadeOut('slow');
			$('.ui_loading_model').fadeOut();
			setTimeout(function(){
				$('.ui_loading').remove();
				$('.ui_loading_model').remove();
			},700);
		}
	}