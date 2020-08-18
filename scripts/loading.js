//加载等待动画效果
function openload(id) {
	var loadWrap = document.getElementById(id);
	loadWrap.classList.remove('disnone');
	dragBox(loadWrap);
	initBoxPos(loadWrap);
};

//清除等待动画效果
function closeload(id) {
	var loadWrap = document.getElementById(id);
	loadWrap.classList.add('disnone');
}

function alert1(txt) {
	$("#alerts", window.top.document).attr("style", "");
	$("#alertTxt", window.top.document).html(txt);
	setTimeout(function () {
		$("#alerts", window.top.document).attr("style", "display:none;");
	}, 10000);
}


//JS日期系列：根据出生日期 得到周岁年龄
function jsGetAge(strBirthday) {
	var returnAge;
	var strBirthdayArr = strBirthday.substring(0, 10).split("-");
	var birthYear = strBirthdayArr[0];
	var birthMonth = strBirthdayArr[1];
	var birthDay = strBirthdayArr[2];

	d = new Date();
	var nowYear = d.getFullYear();
	var nowMonth = d.getMonth() + 1;
	var nowDay = d.getDate();

	if (nowYear == birthYear) {
		returnAge = 0; //同年 则为0岁
	} else {
		var ageDiff = nowYear - birthYear; //年之差
		if (ageDiff > 0) {
			if (nowMonth == birthMonth) {
				var dayDiff = nowDay - birthDay; //日之差
				if (dayDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			} else {
				var monthDiff = nowMonth - birthMonth; //月之差
				if (monthDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			}
		} else {
			returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
		}
	}

	return returnAge; //返回周岁年龄

}