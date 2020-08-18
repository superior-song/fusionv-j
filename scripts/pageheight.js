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
		
		
		ResizeHeigh("divID1",86);
		ResizeHeigh("divID2",576);
		ResizeHeigh("divID3",72);

		ResizeHeigh("divID4",90);
		ResizeHeigh("divID5",60);
		ResizeHeigh("divID6",88);
		ResizeHeigh("divID7",128);

		ResizeHeigh("divID8",60);
		ResizeWidth("divID8",329);

		ResizeHeigh("divID9",0);
		
		ResizeHeigh("divID10",30);
		ResizeHeigh("divID11",105);


}
