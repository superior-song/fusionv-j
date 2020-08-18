
/**
 * Class Pager
 * @author Zhang Hairong at 2017/4/13
 * @version build 2006-11-01
 * @version build 2007-06-25 add en version
 * @version build 2017/4/13 add new css
 * @useage
 * 1.import this file
 * 2.coding as following...
 *   var pager = new Pager(document.forms[0], 692, 20, 3);
 *   pager.addHiddenInputs("id", "45");
 *   document.write(pager.toString());
 */
 
 /**
  * constructor
  * @param form a form object
  * @param recordCount record count
  * @param pageSize page size
  * @param currentPage current page
  * @param lang default is zh_CN
  */
function Pager(form, recordCount, pageSize, currentPage,maxshowPage,lang) {
    this.form = form;
    this.recordCount = recordCount;//listCount 列表总量
    this.pageSize = pageSize;//每页显示条数
    this.currentPage = currentPage;//当前页码
    this.maxshowPageitem = maxshowPage;//分页栏显示页码个数
    this.lang = lang || "cn";
    this._hiddenInputNameAndValues = [];
}
/**
 * to buile a html hidden input element
 * @param name element name and id
 * @param value element value
 */
Pager.prototype.addHiddenInputs = function (name, value) {
	this._hiddenInputNameAndValues[this._hiddenInputNameAndValues.length] = new Array(name, value);
};

/**
 * go to a specific page
 * @param the page
 */
Pager.prototype.gotoPage = function(page) {
	this.form.requestPage.value = page;
	this.form.submit();
};


/**
 * pager string
 */
Pager.prototype.toString = function (){
	var pager = this;
	var pagerStrings = [];
	//NEW CSS:   Zhang Hairong at 2017/4/13 	
	//IMPORTANT: Math.ceil return double in Java but return integer in Javascript
	//OLD CODE:   var pageCount = parseInt(Math.ceil((this.recordCount + this.pageSize - 1) / this.pageSize));
	
	var pageCount = Math.ceil(this.recordCount / this.pageSize);//totle page
	var previousPage = this.currentPage - 1;
	var firstPage = 1;
	var nextPage = this.currentPage + 1;
	var lastPage = pageCount;
	
	switch (this.lang) {
		case "cn":
			if (this.currentPage == 1 || pageCount <= 1) {
				pagerStrings[pagerStrings.length] = '<li><a href="javascript:void(0)"  class="hui">\u9996\u9875</a></li><li><a href="javascript:void(0)" class="hui">&lt;</a></li>';
			} else {
				pagerStrings[pagerStrings.length] = '<li><a href="javascript:void(0)"  onclick="pager.gotoPage(1);">\u9996\u9875</a></li><li><a href="javascript:void(0)" onclick="pager.gotoPage(' + previousPage + ');" >&lt;</a></li> ';
			}
			var miniPageNumber = 1;
	        if(this.currentPage-Math.ceil(this.maxshowPageitem/2)>0&&this.currentPage+Math.ceil(this.maxshowPageitem/2)<=pageCount){
	            miniPageNumber = this.currentPage-parseInt(this.maxshowPageitem/2);
	        }else if(this.currentPage-Math.ceil(this.maxshowPageitem/2)>0&&this.currentPage+Math.ceil(this.maxshowPageitem/2)>pageCount){
	            miniPageNumber = pageCount-this.maxshowPageitem+1;
	            if(miniPageNumber<=0){
	                miniPageNumber=1;
	            }
	        }
	        var showPageNum = this.maxshowPageitem;
	        if(pageCount<showPageNum){
	        	if(pageCount==0){
	        	 showPageNum =1
	        	 this.currentPage=1
	        	}else{
	              showPageNum = pageCount;
	        	}
	        }
			
			for(var i=1;i<=showPageNum;i++){
				var pageNumber = miniPageNumber++;
				if(pageNumber==this.currentPage){
					pagerStrings[pagerStrings.length] ='<li><a href="javascript:void(0)"  class="fyXz" >'+pageNumber+'</a></li>'
					}else{
						pagerStrings[pagerStrings.length] ='<li><a href="javascript:void(0)" onclick="pager.gotoPage(' + pageNumber + ');" >'+pageNumber+'</a></li>'	
					}
				
			}
			
			
			if (this.currentPage == pageCount || pageCount <= 1) {
				pagerStrings[pagerStrings.length] = '<li><a href="javascript:void(0)" class="hui">&gt;</a><a href="javascript:void(0)" class="hui">\u5c3e\u9875</a></li>';
			} else {
				pagerStrings[pagerStrings.length] = '<li><a href="javascript:void(0)" onclick="pager.gotoPage(' + nextPage + ');" >&gt;</a></li><li><a href="javascript:void(0)" onclick="pager.gotoPage(' + lastPage + ');">\u5c3e\u9875</span></a></li>';
			}
			
			pagerStrings[pagerStrings.length] = '<input name="pager.requestPage" type="hidden" id="requestPage" />';
			break;
			
		default:
			if (this.currentPage == 1 || pageCount <= 1) {
				pagerStrings[pagerStrings.length] = '<li><a href="javascript:void(0)"  class="hui">\u9996\u9875</a></li><li><a href="javascript:void(0)" class="hui">&lt;</a></li>';
			} else {
				pagerStrings[pagerStrings.length] = '<li><a href="javascript:void(0)"  onclick="pager.gotoPage(1);">\u9996\u9875</a></li><li><a href="javascript:void(0)" onclick="pager.gotoPage(' + previousPage + ');" >&lt;</a></li> ';
			}
			var miniPageNumber = 1;
	        if(this.currentPage-Math.ceil(this.maxshowPageitem/2)>0&&this.currentPage+Math.ceil(this.maxshowPageitem/2)<=pageCount){
	            miniPageNumber = this.currentPage-parseInt(this.maxshowPageitem/2);
	        }else if(this.currentPage-Math.ceil(this.maxshowPageitem/2)>0&&this.currentPage+Math.ceil(this.maxshowPageitem/2)>pageCount){
	            miniPageNumber = pageCount-this.maxshowPageitem+1;
	            if(miniPageNumber<=0){
	                miniPageNumber=1;
	            }
	        }
	        var showPageNum = this.maxshowPageitem;
	        if(pageCount<showPageNum){
	        	if(pageCount==0){
		        	 showPageNum =1
		        	 this.currentPage=1
		        	}else{
		              showPageNum = pageCount;
		        	}
	        }
			
			for(var i=1;i<=showPageNum;i++){
				var pageNumber = miniPageNumber++;
				if(pageNumber==this.currentPage){
					pagerStrings[pagerStrings.length] ='<li><a href="javascript:void(0)"  class="fyXz" >'+pageNumber+'</a></li>'
					}else{
						pagerStrings[pagerStrings.length] ='<li><a href="javascript:void(0)" onclick="pager.gotoPage(' + pageNumber + ');" >'+pageNumber+'</a></li>'	
					}
				
			}
			if (this.currentPage == pageCount || pageCount <= 1) {
				pagerStrings[pagerStrings.length] = '<li><a href="javascript:void(0)" class="hui">&gt;</a><a href="javascript:void(0)" class="hui">\u5c3e\u9875</a></li>';
			} else {
				pagerStrings[pagerStrings.length] = '<li><a href="javascript:void(0)" onclick="pager.gotoPage(' + nextPage + ');" >&gt;</a></li><li><a href="javascript:void(0)" onclick="pager.gotoPage(' + lastPage + ');">\u5c3e\u9875</span></a></li>';
			}
			
			pagerStrings[pagerStrings.length] = '<input name="pager.requestPage" type="hidden" id="requestPage" />';
			break;
	}
	var _hiddenInputStrings = [];
	for (var i = 0; i < this._hiddenInputNameAndValues.length; i++){
		_hiddenInputStrings[_hiddenInputStrings.length] = '<input name="' + this._hiddenInputNameAndValues[i][0] + '" type="hidden" id="' + this._hiddenInputNameAndValues[i][0] + '" value="' + this._hiddenInputNameAndValues[i][1] + '" />';
	}
	pagerStrings[pagerStrings.length] = _hiddenInputStrings.join("").toString();
	return pagerStrings.join("").toString();
};

/**
 * 动态传递参数
 * @param the page
 */
function gotoPageObj(obj) {
//	 var thisObj=${obj};
//	 var page=thsiObj.attr("page-data");
//	 this.form.requestPage.value = page;
//	 this.form.submit();
	alert(111);
}


function isInteger(value) {
	return /^[-\+]?\d+$/.test(value)
}

function checkAll(e) {
	for (var i = e.form.elements.length - 1; i > 0; i--) {
		if (e.form.elements[i].type == "checkbox" && e.form.elements[i].disabled == false) {
			e.form.elements[i].checked = e.checked;
		}
	}
}

function confirmDeleteAll(form) {
	var checkedCount = 0;
	if (!form.pks) {
		return;
	}
	if(!form.pks.length) {
		if (form.pks.checked == true) {
			checkedCount = 1;
		}
	}
	for (var i = 0; i < form.pks.length; i++) {
		if (form.pks[i].checked == true) {
			checkedCount++;
		}
	}
	if (checkedCount == 0) {
		alert("请至少选择一个删除项！");
	} else {
		if(confirm("确定要删除所有选中的项吗？")) {
			form.method.value = "delete";
			form.submit();
		}
	}
}

function confirmUpdateAll(form){
	var checkedCount = 0;
	if (!form.pks) {
		return;
	}
	if(!form.pks.length) {
		if (form.pks.checked == true) {
			checkedCount = 1;
		}
	}
	for (var i = 0; i < form.pks.length; i++) {
		if (form.pks[i].checked == true) {
			checkedCount++;
		}
	}
	if (checkedCount == 0) {
		alert("请选择至少一项");
	} else {
		if(confirm("确认审核所有选项")) {
			form.method.value = "updateAll";
			form.submit();
		}
	}
}
function confirmAuditAll(form){
	var checkedCount = 0;
	if (!form.pks) {
		return;
	}
	if(!form.pks.length) {
		if (form.pks.checked == true) {
			checkedCount = 1;
		}
	}
	for (var i = 0; i < form.pks.length; i++) {
		if (form.pks[i].checked == true) {
			checkedCount++;
		}
	}
	if (checkedCount == 0) {
		alert("请选择至少一项");
	} else {
		if(confirm("确认审核")) {
			form.method.value = "auditAll";
			form.submit();
		}
	}
}

function confirmDelete(msg, page, queryString) {
	msg  = msg  || "确定删除这条信息吗？";
	page = page || "?";
	page = page.indexOf("?") != -1 ? page : (page + "?");
	if(confirm(msg)){
		location.href = page + "method=delete&" + queryString;
	}
}
function confirmUpdate(msg, page, queryString) {
	//msg  = msg  || "\u786e\u5b9a\u4fee\u6539\u8fd9\u6761\u4fe1\u606f\u5417\uff1f";
	page = page || "?";
	page = page.indexOf("?") != -1 ? page : (page + "?");
	location.href = page  + "method=edit&" + queryString;
}

function doNeedMethod(msg, page, method, queryString) {
	//msg  = msg  || "\u786e\u5b9a\u4fee\u6539\u8fd9\u6761\u4fe1\u606f\u5417\uff1f";
	page = page || "?";
	page = page.indexOf("?") != -1 ? page : (page + "?");
	location.href = page  + "method=" + method + "&" + queryString;
}

//-->