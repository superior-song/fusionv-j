var currentChoice = true;
arrow1=new Image;
arrow2=new Image;
arrow1.src="../skin/darkBlue/images/pic16.jpg";
arrow2.src="../skin/darkBlue/images/pic15.jpg";
function hidFrame(){

	if(currentChoice){
		$("#img1").attr("src", arrow1.src);
		$("#img1").attr("alt", "隐藏菜单");
		window.parent.clickhide();
	} else {
		$("#img1").attr("src", arrow2.src);
		$("#img1").attr("alt", "显示菜单");
		window.parent.clickshow();
	}
	currentChoice = !currentChoice;
}
