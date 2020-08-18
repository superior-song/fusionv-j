function play(elem){  
	var vlc=document.getElementById('vlc');  
	vlc.playlist.clear();  
	vlc.playlist.add(elem.href);  
	vlc.playlist.play();          
}



	
function isInsalledIEVLC(){ 
	
	var vlcObj = null;
	var vlcInstalled= false;
	
	try {
		vlcObj = new ActiveXObject("VideoLAN.Vlcplugin.2"); 
		if( vlcObj != null ){ 
			vlcInstalled = true 
		}
	} catch (e) {
		vlcInstalled= false;
	}        
	return vlcInstalled;
} 

function isInsalledFFVLC(){
	 var numPlugins=navigator.plugins.length;
	 for  (i=0;i<numPlugins;i++)
	 {
		  plugin=navigator.plugins[i];
		  if(plugin.name.indexOf("VideoLAN") > -1 || plugin.name.indexOf("VLC") > -1)
		{            
			 return true;
		}
	 }
	 return false;
}



 //存储变量信息
 var VAR ={
     repeatTemp:[]
 }

 var COM = {
     repeat:function(s,t){//限制执行频率，默认为2秒 允许执行时返回false
         t = t ? t * 1000 : 2000;//毫秒
         var time = microtime();
             if(!VAR.repeatTemp[s]){
                 VAR.repeatTemp[s] = time;
                 return false;//允许
             }else{
                 var ts = t - (time - VAR.repeatTemp[s]);
                 ts = parseInt(ts/1000);
             if(ts > 0){
                // alert("频率限制：还有 <b>"+ ts +"</b> 秒才可以再执行！");
                 return true;//禁止执行
             }else{

                 VAR.repeatTemp[s] = time;//更新时间
                 return false;//允许
             }
         }
     }
 }


 //刷新
 function ref(){
     var btn = COM.repeat('btn');
     if(!btn){alert("可以执行了！");}else{return;}
 }


 //获取毫秒级时间戳
 function microtime(){

     return new Date().getTime();
 }  
