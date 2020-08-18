// YOU MUST IMPORT JQUERY LIB AT FIRST
$(document).ready(function(){
	$(".datagrid tr").mouseover(function(){  
		$(this).addClass("over");
	}).mouseout(function(){
		$(this).removeClass("over");
	})
	$(".datagrid tr:even").addClass("alt");
})