var popping_id = "";
var popping_name = "";
var popping_func = "";

//部门树选择用户
function deptTreeSelUser(namesID, idsID, func) {
	popping_id = idsID;
	popping_name = namesID;
	popping_func = func;
	openDialog("Selector.do?method=deptTree&ts=" + new Date().getTime(), 900, 600);
}

////部门树选择用户
//function deptTreeSelUser(namesID,idsID){
//    popping_id=idsID;
//    popping_name=namesID;
//    openDialog("Selector.do?method=deptTree&ts="+new Date().getTime(),900,600);
//}

//部门树选择部门（不含部门）
function deptTreeSelDept(namesID, idsID) {
	popping_id = idsID;
	popping_name = namesID;
	openDialog("Selector.do?method=radioTree&treeName=ptOrgInfo&ts=" + new Date().getTime(), 360, 200);
}

//部门树选择部门 (不包括机构下子部门，如：公安局网络科)
function deptTreeSelDeptDept(namesID, idsID, func) {
	popping_id = idsID;
	popping_name = namesID;
	popping_func = func;
	openDialog("Selector.do?method=radioTree&treeName=ptOrgInfoDept&ts=" + new Date().getTime(), 360, 500);
}

//机构树（包含部门）
function orgTreeWithDept(namesID, idsID) {
	popping_id = idsID;
	popping_name = namesID;
	openDialog("Selector.do?method=radioTree&treeName=ptOrgInfoWithDept&ts=" + new Date().getTime(), 360, 500);
}

//选择服务提供方
function seldelProvider(ids, names) {
	popping_id = ids;
	popping_name = names;
	var Ids = $("#" + ids).val();
	if (Ids == "") {
		Ids = -1;
	}
	openDialog("Selector.do?method=delProvider&ids=" + Ids +
		"&ts=" + new Date().getTime(), 900, 600);
}

//菜单树选择菜单
function moduleTreeSelMod(namesID, idsID, sub_sys_id) {
	popping_id = idsID;
	popping_name = namesID;
	var sub_sys_id = $("#" + sub_sys_id).val();

	if (sub_sys_id == 11) { //图像管理子系统
		openDialog("Selector.do?method=radioTree&treeName=txSysModule&ts=" + new Date().getTime(), 360, 500);
	} else if (sub_sys_id == 12) { //运维管理子系统
		openDialog("Selector.do?method=radioTree&treeName=ywSysModule&ts=" + new Date().getTime(), 360, 500);
	} else if (sub_sys_id == 13) { //卡口管理子系统
		openDialog("Selector.do?method=radioTree&treeName=kkSysModule&ts=" + new Date().getTime(), 360, 500);
	} else if (sub_sys_id == 20) { //多源重构管控平台
		openDialog("Selector.do?method=radioTree&treeName=ptSysModule&ts=" + new Date().getTime(), 360, 500);
	} else if (sub_sys_id == 14) { //gis管理子系统树
		openDialog("Selector.do?method=radioTree&treeName=gisSysModule&ts=" + new Date().getTime(), 360, 500);
	}
}

/**
 * 打开窗口
 * @param URL
 * @param Width
 * @param Height
 */
function openDialog(URL, Width, Height) {
	var url_ = URL;
	var diag = new Dialog();
	diag.ID = "poppingDialogId";
	diag.Width = Width;
	diag.Height = Height;
	diag.URL = url_;
	diag.CancelEvent = function () {
		Dialog.getInstance("poppingDialogId").close();
	};
	diag.show();
	diag.cancelButton.value = "关 闭";
	diag.okButton.style.display = "none";
}

/**
 * 包装返回值
 */
function j_dialogCallback(id, name) {
	$("#" + popping_id).val(id);
	$("#" + popping_name).val(name);
	var rtn = new Object();
	rtn["ids"] = id;
	rtn["names"] = name;
	if (popping_func != "" && popping_func != undefined && popping_func != null) {
		popping_func(rtn);
	}
}