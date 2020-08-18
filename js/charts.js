(function() {
	var myChart1 = echarts.init(document.getElementById('pie1'));
	var option1 = {
		title : {
			text : '0%',
			x : 'center',
			y : 'center',
			itemGap : 2,
			textStyle : {
				fontWeight : 'bold',
				color : '#ffffff',
				fontSize : '16'
			}
		},
		series : [ {
			name : 'Line',
			type : 'pie',
			clockWise : true,
			radius : [ '75%', '95%' ],
			center : [ '50%', '50%' ],
			itemStyle : {
				normal : {
					label : {
						show : false
					},
					labelLine : {
						show : false
					}
				}
			},
			hoverAnimation : false,
			data : []
		} ]
	}

	myChart1.setOption(option1);
	getMyChart(myChart1);
	var myChart2 = echarts.init(document.getElementById('pie2'));
	var option2 = {
		title : {
			text : '0%',
			x : 'center',
			y : 'center',
			itemGap : 2,
			textStyle : {
				fontWeight : 'bold',
				color : '#ffffff',
				fontSize : '16'
			}
		},
		series : [ {
			name : 'Line',
			type : 'pie',
			clockWise : true,
			radius : [ '75%', '95%' ],
			center : [ '50%', '50%' ],
			itemStyle : {
				normal : {
					label : {
						show : false
					},
					labelLine : {
						show : false
					}
				}
			},
			hoverAnimation : false,
			data : []
		} ]
	}

	myChart2.setOption(option2);
	getMyCharts(myChart2);

})();

function getMyChart(myChart1) {
	$.ajax({
		type : "post",
		async : true, // 异步请求
		url : "Frames.do", // 请求发送到Frames.do处
		data : {
			method : 'getAlarmIsUesfulCount'
		},
		dataType : "json", // 返回数据形式为json
		success : function(result) {
			// 请求成功时执行该函数内容，result即为服务器返回的json对象
			if (result) {

				myChart1.hideLoading(); // 隐藏加载动画
				myChart1.setOption({ // 加载数据图表
					title : {
						text : result.proportion + '%'
					},
					series : [ {
						data : [ {
							value : result.count,
							name : '战果',
							itemStyle : {
								normal : {
									color : '#ffd800',
									label : {
										show : false
									},
									labelLine : {
										show : false
									}
								}
							}
						}, {
							name : '已处理',
							value : result.process,
							itemStyle : {
								normal : {
									color : '#28d4ff'
								}
							}
						} ]
					} ],
				});
			}
		},
		error : function(errorMsg) {
			// 请求失败时执行该函数
			alert("图表请求数据失败!");
		}
	});
}

function getMyCharts(myChart2) {
	$.ajax({
		type : "post",
		async : true, // 异步请求
		url : "Frames.do", // 请求发送到Frames.do处
		data : {
			method : 'getAlarmIsProcessCount'
		},
		dataType : "json", // 返回数据形式为json
		success : function(result) {
			// 请求成功时执行该函数内容，result即为服务器返回的json对象
			if (result) {

				myChart2.hideLoading(); // 隐藏加载动画
				myChart2.setOption({ // 加载数据图表
					title : {
						text : result.proportion + '%'
					},
					series : [ {
						data : [ {
							value : result.count,
							name : '已处理',
							itemStyle : {
								normal : {
									color : '#ffd800',
									label : {
										show : false
									},
									labelLine : {
										show : false
									}
								}
							}
						}, {
							name : '告警',
							value : result.process,
							itemStyle : {
								normal : {
									color : '#28d4ff'
								}
							}
						} ]
					} ],
				});
			}
		},
		error : function(errorMsg) {
			// 请求失败时执行该函数
			alert("图表请求数据失败!");
		}
	});
}