var currentLine=-1, offsetTr = 0;
//var $ =function(id){ return document.getElementById(id);}
	function keyDownEvent(e,divName,divName2){
		var e = window.event||e;
		if(e.keyCode==38){
			offsetTr = 150;
			currentLine--;
			changeItem(divName2);
		}else if(e.keyCode==40){
			offsetTr = 150;
			currentLine++;
	        changeItem(divName2);
		}else if(e.keyCode==13&&currentLine>-1){
			addUser(divName,divName2);
			document.forms[0].submit();
		}else{
			keyupFun(divName,divName2);
		}
		return false;
	}
	function changeItem(divName2){
		if(!$('#buddyListTable')[0]) return false;
		var it = $('#buddyListTable')[0];
		if(document.all){
			it = $('#buddyListTable')[0].children[0];
		}
		changeBackground();
		if(currentLine<0) currentLine = it.rows.length-1;
		if(currentLine >= it.rows.length) currentLine = 0;
		it.rows[currentLine].className = "buddyListHighLight";
		if($("#"+divName2)[0]){
			$("#"+divName2)[0].scrollTop = it.rows[currentLine].offsetTop-offsetTr;
		}
	}
	function changeBackground(){
		var it = $('#buddyListTable')[0];
		if(document.all){
			it = $('#buddyListTable')[0].children[0];
		}
		for(var i=0; i<it.rows.length; i++){
			if(i%2==0){
				it.rows[i].className = "buddyListOdd";
			}else{
				it.rows[i].className = "buddyListEven";
			}
		}
	}
	function addUser(divName,divName2){
		var it = $('#buddyListTable')[0];
		if(document.all){
			it = $('#buddyListTable')[0].children[0];
		}
		var trBody = it.rows[currentLine].innerText;
		divclick(trim(trBody),divName,divName2);
	}

	//号牌输入框光标移动事件
	function keyupFun(divName,divName2){
		var value = $("#"+divName).val();
		var result = new Array();
		if (value != "") {
			for(var i = 0;i<dArray.length;i++){
				var pk = dArray[i];
				txt = dArray[i].toLowerCase();
				qp = ConvertPinyin(txt);//全拼
				var jpp = makePy(txt).toString().toLowerCase();
				jp = jpp.replace(",","");//取汉字首字母
				if(txt.indexOf(value)!=-1||qp.indexOf(value)!=-1||jp.indexOf(value)!=-1){
					result.push(dArray[i]);
				}
			}
			$("#"+divName2).empty();
			resultFun(result,divName,divName2);
			currentLine =-1;
		}
	}
	//根据返回的值进行DIV组装,并显示在输入框下
	function resultFun(result,divName,divName2){
		var offsetY = $("#"+divName).offset().top;
		var offsetX = $("#"+divName).offset().left;
		$("#"+divName2).css("top",offsetY+25);
		$("#"+divName2).css("left",offsetX);
		var arr ="<table cellspacing='0' cellpadding='0' border='0' width='100%' id='buddyListTable'>"
		for(var i=0;i<result.length;i++){
			if(i%2 == 0){
				arr+="<tr class='buddyListOdd'><td style='cursor: pointer;' onclick=divclick('"+result[i]+"','"+divName+"','"+divName2+"')><a href='#'>&nbsp;"+result[i]+"</a></td></tr>";
			}else{
				arr+="<tr class='buddyListEven'><td style='cursor: pointer;'  onclick=divclick('"+result[i]+"','"+divName+"','"+divName2+"')><a href='#'>&nbsp;"+result[i]+"</a></td></tr>";
			}
		}
		arr+="</table>"
		$("#"+divName2).append(arr);
		$("#"+divName2).show();
	}
	//点击返回值列表赋值
	function divclick(temp,divName,divName2){
		$("#"+divName).val(temp);
		$("#"+divName2).hide();
	}
	
	function trim(str){
      	return str.replace(/(^\s*)|(\s*$)/g,"");
    }
    document.onclick = function(event){
		$(".divNo").hide();
	};
