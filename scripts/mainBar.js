	var flag=true;
	function ResizeHeigh(id,offset)
	{
		try{
			var winHeight=document.body.clientHeight; 
			if(winHeight>offset)
				  document.getElementById(id).style.height=(winHeight-offset)+"px";
			else document.getElementById(id).style.height="0px";
		}
		catch(e)
		{
		}
	}
	function ResizeWidth(id,offset)
	{
		try{
			var winWidth=document.body.clientWidth; 
			if(winWidth>offset)
				  document.getElementById(id).style.width=(winWidth-offset)+"px";
			else document.getElementById(id).style.width="0px";
		}
		catch(e)
		{
		}
	}

	function Resize()
	{
		ResizeHeigh("left_menu",141);
		ResizeHeigh("right_body",141);
		ResizeHeigh("mid_body",141);
		if(flag){
		ResizeWidth("right_body",264);
		}
		else{
		ResizeWidth("right_body",11);
		}
		ResizeWidth("top_banner",0);
		ResizeWidth("nav_banner",0);
		ResizeWidth("bottom_banner",0);
	}

	function clickhide()
	{
		$("#divtest").hide();
		ResizeWidth("right_body",11);
		flag=false;
	}
	function clickshow()
	{
		$("#divtest").show();
		ResizeWidth("right_body",264);
		flag=true;
	}
