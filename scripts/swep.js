//$(document).ready(function(){
//	$("#swepimg").click(function() {  
//		swep();
//	});
//	$("#swepimg").addClass("swepimg");
//	
//})

// 说明：
// oarcont  是展开左边时右侧的CSS
// oarcont2 是隐藏左边时右侧的CSS

// 左侧菜单栏
function show(c_Str){
	if(document.getElementById(c_Str).style.display=='none'){
		document.getElementById(c_Str).style.display='block';
		document.getElementById("t"+c_Str).className="oalnav_cur";
	}else{
		document.getElementById(c_Str).style.display='none';
		document.getElementById("t"+c_Str).className="oalnav"
	}
}
function high(){
if (this.className=="k"){
this.style.background="336699"
this.style.color="white"
}
}
function low(){
if (this.className=="k"){
this.style.background="99CCFF"
this.style.color=""
}
}

