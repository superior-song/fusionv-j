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
	

		ResizeHeigh("right_body",114);
		
		ResizeWidth("right_body",0);
		ResizeWidth("top_banner",0);
		ResizeWidth("bottom_banner",0);
		

		
		
	}




