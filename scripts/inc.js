/**
 * writeCookie
 * @param name cookie name
 * @param value cookie value
 * @param hours expires hours
 * @useage writeCookie("myCookie", "my name", 24);
 *         Stores the string "my name" in the cookie "myCookie" which expires after 24 hours.
 */
function writeCookie(name, value, hours){
  var expire = "";
  if(hours != null){
    expire = new Date((new Date()).getTime() + hours * 3600000);
    expire = "; expires=" + expire.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expire;
}

/**
 * readCookie
 * @param name cookie name
 * @useage readCookie("myCookie");
 */
function readCookie(name){
  var cookieValue = "";
  var search = name + "=";
  if(document.cookie.length > 0){
    offset = document.cookie.indexOf(search);
    if (offset != -1){
      offset += search.length;
      end = document.cookie.indexOf(";", offset);
      if (end == -1) end = document.cookie.length;
      cookieValue = unescape(document.cookie.substring(offset, end))
    }
  }
  return cookieValue;
}
/**
 * get html element object(use this method recommend)
 * @param id as element id
 */
function getElementById(id) {
	if (typeof (id) != "string" || id == "") {
		return null;
	}
	if (document.getElementById) {
		return document.getElementById(id);
	}
	if (document.all) {
		return document.all(id);
	}
	try {
		return eval(id);
	}
	catch (e) {
		return null;
	}
}
function $(id) {
	if (typeof (id) != "string" || id == "") {
		return null;
	}
	if (document.getElementById) {
		return document.getElementById(id);
	}
	if (document.all) {
		return document.all(id);
	}
	try {
		return eval(id);
	}
	catch (e) {
		return null;
	}
}
/**
 * get html element absolute position
 * @param e as a html element
 */
function getAbsPoint(e) {
	var x = e.offsetLeft;
	var y = e.offsetTop;
	while (e = e.offsetParent) {
		x += e.offsetLeft;
		y += e.offsetTop;
	}
	return {"x":x, "y":y};
}

/**
 * format date
 * @param style as a string like "yyyy-mm-dd hh:mm:ss w"
 * @author: meizz
 * @edit: kimsoft add w+
 */
Date.prototype.format = function (style) {
	var o = {"M+":this.getMonth() + 1, "d+":this.getDate(), "h+":this.getHours(), "m+":this.getMinutes(), "s+":this.getSeconds(), "q+":Math.floor((this.getMonth() + 3) / 3), "S":this.getMilliseconds(), "w+":"\u5929\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".charAt(this.getDay())};
	if (/(y+)/.test(style)) {
		style = style.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(style)) {
			style = style.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return style;
};

/**
 * print content of current window's document
 */
function printWindow() {
	window.print();
}

/**
 * close current window
 */
function closeWindow() {
	window.opener = null;
	window.close();
}
/**
 * add url to favorite
 */
function addFavorite(sURL, sTitle) 
{ 
    try 
    { 
        window.external.addFavorite(sURL, sTitle); 
    } 
    catch (e) 
    { 
        try 
        { 
            window.sidebar.addPanel(sTitle, sURL, ""); 
        } 
        catch (e) 
        { 
            alert("加入收藏失败，请使用Ctrl+D进行添加"); 
        } 
    } 
}
//-->