	function Resize()
	{
	     var winHeight=document.body.clientHeight; 
		 
		 if(winHeight>=0)
		 document.getElementById("divID").style.height=(winHeight-10)+"px";
		 else 
		 document.getElementById("divID").style.height="0px";
		 
	}
	
	
	


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
		ResizeHeigh("x1",50);
		ResizeHeigh("x2",73);
	}
