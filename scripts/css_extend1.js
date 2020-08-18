$(document).ready(function(){
	var checkStr = $("[name='checkStr']").val();
	//全部checkbox数目
	var allSize=$("span label[class='el-checkbox'] input[type='checkbox']").size();
	$("span label[class='el-checkbox'] input[type='checkbox']").each(function(){
		var checkBoxValue=","+$(this).val()+",";
		if(checkStr.indexOf(checkBoxValue)!=-1){
			//添加选中后的样式
			/*if($(this).parents("span").length>0){
				$(this).parents("li").attr("class","dq");
			}else{
				$(this).parents("li").attr("class","t_p_l2");
			}*/
			$(this).attr("checked","true");
		}
	});
	//选中的checkbox数目
	var checkedSize=$("span label[class='el-checkbox'] input[type='checkbox']:checked").size();
	//全部checkbox数目与选中的checkbox数目相等，全选按钮选中
	if(allSize==checkedSize && allSize!=0){
		$("div[class='c_x_icon2'] input[type='checkbox']").attr("checked","true");
	}
});
/**
 * 单选、取消单选
 */
function check_box_status(obj){
	var str=",";
	//已经选择的checkbook的值
	var checkStr = $("[name='checkStr']").val();
	var strArray = checkStr.split(",");
	if(strArray.length > 1){
		str = checkStr;
	}
	var value=$(obj).val();
	if(obj.checked){
		//添加选中后的样式
		/*$(obj).parent().parent().parent().attr("class","t_p_l2");*/
		/*if($(obj).parents("span").length>0){
			$(obj).parents("li").attr("class","dq");
		}else{
			$(obj).parents("li").attr("class","t_p_l2");
		}*/
		//全部checkbox数目
		var allSize=$("span label[class='el-checkbox'] input[type='checkbox']").size();
		//选中的checkbox数目
		var checkedSize=$("span label[class='el-checkbox'] input[type='checkbox']:checked").size();
		//全部checkbox数目与选中的checkbox数目相等，全选按钮选中
		if(allSize==checkedSize){
			$("div[class='c_x_icon2'] input[type='checkbox']").attr("checked","true");
		}
		
		//将该值添加至选中的序列中
		str += value+",";
		$("[name='checkStr']").val(str);
	}else{
		//取消选中样式
		//$(obj).parent().parent().parent().attr("class","");
		//$(obj).parents("li").attr("class","");
		//未全部选中，取消全选按钮选中效果
		$("div[class='c_x_icon2'] input[type='checkbox']").removeAttr("checked");
		
		strArray = str.split(",");
		for(var k=0; k< strArray.length; k++){
			if(strArray[k] == value){
				strArray.splice(k,1);
			}   
		}
		$("[name='checkStr']").val(strArray);
	}
}

/**
 * 全选、取消全选
 */
function check_all_box_status(obj){
	if(obj.checked){
		var str=",";
		var checkStr = $("[name='checkStr']").val();
		var strArray = checkStr.split(",");
		//已经选中的值
		if(strArray.length > 1){
			str = checkStr;
		}
		//添加选中后的样式
		//$("ul[class='t_p_list'] li").attr("class","t_p_l2");
		//$("ul[class='tp_db'] li").attr("class","dq");
		//只增加没有选中的
		$("span label[class='el-checkbox'] input[type='checkbox']").each(function(){
			if(!this.checked){
				str += $(this).val()+",";
				this.checked=true;			
			}
		});
		//赋值
		$("[name='checkStr']").val(str);
	}else{
		var checkStr = $("[name='checkStr']").val();
		var strArray= checkStr.split(",");
		//$("ul[class='t_p_list'] li,ul[class='tp_db'] li").attr("class","");

		$("span label[class='el-checkbox'] input[type='checkbox']").each(function(){
			var index=strArray.indexOf($(this).val());
			if(index > 0){
				strArray.splice(index,1);
			}
			this.checked=false;
		});
		$("[name='checkStr']").val(strArray);
	}
}