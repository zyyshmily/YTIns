// JavaScript Document
//ADTOOA 2017-02-07 START



//task application switch icons and colors
function switchIcon(e) {
	var icon = document.querySelector(e).querySelectorAll("i.iconfont");
	for(var i = 0; i < icon.length; i++) {
		var iconpara = document.querySelector(e).querySelectorAll(".mui-media-body")[i];
		var content = iconpara.innerText.split("", 2).join("");

		switch(content) {
			case "请假":
				icon[i].parentNode.style.backgroundColor = "#ff9a9a";
				icon[i].innerHTML = "&#xe669;";
				icon[i].parentElement.parentElement.setAttribute('href','app-qingjia.html');
				break;
			case "外出":
				icon[i].parentNode.style.backgroundColor = "#82c8a6";
				icon[i].innerHTML = "&#xe659;";
				icon[i].parentElement.parentElement.setAttribute('href','app-waichu.html');
				break;
			case "呈签":
				icon[i].parentNode.style.backgroundColor = "#facd89";
				icon[i].innerHTML = "&#xe653;";
				icon[i].parentElement.parentElement.setAttribute('href','app-chengqian.html');
				break;
			case "出差":
				icon[i].parentNode.style.backgroundColor = "#a788fd";
				icon[i].innerHTML = "&#xe650;";
				icon[i].parentElement.parentElement.setAttribute('href','app-chuchai.html');
				break;
			case "用车":
				icon[i].parentNode.style.backgroundColor = "#fdba88";
				icon[i].innerHTML = "&#xe667;";
				icon[i].parentElement.parentElement.setAttribute('href','app-yongche.html');
				break;
			case "考勤":
				icon[i].parentNode.style.backgroundColor = "#76ccfe";
				icon[i].innerHTML = "&#xe691;";
				icon[i].parentElement.parentElement.setAttribute('href','app-kaoqin.html');
				break;
			case "电脑":
				icon[i].parentNode.style.backgroundColor = "#82c8a6";
				icon[i].innerHTML = "&#xe688;";
				icon[i].parentElement.parentElement.setAttribute('href','app-diannao.html');
				break;
			case "会议":
				icon[i].parentNode.style.backgroundColor = "#facd89";
				icon[i].innerHTML = "&#xe652;";
				icon[i].parentElement.parentElement.setAttribute('href','app-huiyishi.html');
				break;
			case "宿舍":
				icon[i].parentNode.style.backgroundColor = "#fdba88";
				icon[i].innerHTML = "&#xe67d;";
				icon[i].parentElement.parentElement.setAttribute('href','app-sushe.html');
				break;
			case "加班":
				icon[i].parentNode.style.backgroundColor = "#fdba88";
				icon[i].innerHTML = "&#xe64e;";
				icon[i].parentElement.parentElement.setAttribute('href','app-jiaban.html');
				break;
			default:
				icon[i].parentNode.style.backgroundColor = "#fdba88";
				icon[i].innerHTML = "&#xe64e;";
				
		}
	}
}

var tokenKey = 'accessToken';
var pageIndex = 1;
var pageSize = 5;
var mask=mui.createMask();
//请求数据


function requestData(requestUrl, pageIndex, pageSize, vmObj) {
	var state = app.getState();

	if(state.token) {
		var token = state.token;

		var headers = {};
		if(token) {
			headers.Authorization = 'Bearer ' + token;
		}
		var postData = {
			PageIndex: pageIndex,
			PageSize: pageSize
		};
		mui.ajax(requestUrl, {

			dataType: 'json',
			type: 'post',
			timeout: 10000,
			headers: headers,
			data: postData,
			success: function(data) {
				console.log(JSON.stringify(data));
				vmObj(data);
			},
			error: function(xhr, type, errorThrown) {
				console.log(type);
				console.log(requestUrl);
				if(type == 'timeout'){plus.nativeUI.toast('请求超时')}
			},
			beforeSend: function() {
		        plus.nativeUI.showWaiting('正在加载...');
		        mask.show();//显示遮罩层
		    },
		    complete: function() {
		        plus.nativeUI.closeWaiting();
		        mask.close();//关闭遮罩层
		    }
		});

	}
}

//请求数据
function requestDataGet(requestUrl, pageIndex, pageSize, vmObj) {
	var state = app.getState();
	if(state.token) {
		var token = state.token;
		var headers = {};
		if(token) {
			headers.Authorization = 'Bearer ' + token;
		}
		console.log(requestUrl);
		mui.ajax(requestUrl, {
			dataType: 'json',
			type: 'get',
			timeout: 10000,
			headers: headers,
			success: function(data) {
				console.log(JSON.stringify(data));
				vmObj(data);
			},
			error: function(xhr, type, errorThrown) {
				console.log(type);
				//console.log(requestUrl);
				if(type == 'timeout'){plus.nativeUI.toast('请求超时')}
			}
		});

	}
}

/*获取用户的申请单列表*/
function GetFlowTaskList(requestUrl, keyword, schemeType, pageIndex, pageSize, vmObj) {
	var state = app.getState();

	if(state.token) {
		var token = state.token;
		var headers = {};
		if(token) {
			headers.Authorization = 'Bearer ' + token;
		}
		var postData = {
			Keyword: keyword,
			SchemeType: schemeType,
			PageIndex: pageIndex,
			PageSize: pageSize
		};
		console.log(requestUrl);
		mui.ajax(requestUrl, {

			dataType: 'json',
			data: postData,
			type: 'post',
			timeout: 10000,
			headers: headers,
			success: function(data) {
				console.log(JSON.stringify(data));
				vmObj(data);
			},
			error: function(xhr, type, errorThrown) {
				console.log(JSON.stringify(xhr));
			},
			beforeSend: function() {
		        plus.nativeUI.showWaiting('正在加载...');
		        mask.show();//显示遮罩层
		    },
		    complete: function() {
		        plus.nativeUI.closeWaiting();
		        mask.close();//关闭遮罩层
		    }
		});

	}
}

/*公告通知*/
function GetInfoList(requestUrl, fullHead, searchFlag, pageSize, pageIndex, sidxField, sordType, vmObj) {
	var state = app.getState();

	if(state.token) {
		var token = state.token;
		var headers = {};
		if(token) {
			headers.Authorization = 'Bearer ' + token;
		}

		var postData = {
			_search: searchFlag,
			PageIndex: pageIndex,
			PageSize: pageSize,
			sidx: sidxField,
			sord: sordType,
			FullHead: fullHead

		};
		mui.ajax(requestUrl, {

			dataType: 'json',
			data: postData,
			type: 'post',
			timeout: 10000,
			headers: headers,
			success: function(data) {
				//console.log(JSON.stringify(data));
				vmObj(data);
			},
			error: function(xhr, type, errorThrown) {
				//console.log(type);
			}
		});

	}

}

/*考勤*/
function GetAttendanceList(enrollNumber, startDate, endDate, searchFlag, pageSize, pageIndex, sidxField, sordType, vmObj) {
	var state = app.getState();

	if(state.token) {
		var token = state.token;
		var headers = {};
		if(token) {
			headers.Authorization = 'Bearer ' + token;
		}

		var postData = {
			_search: searchFlag,
			PageIndex: pageIndex,
			PageSize: pageSize,
			sidx: sidxField,
			sord: sordType,
			StartDate: startDate,
			EndDate: endDate,
			enrollNumber: enrollNumber

		};
		mui.ajax(app.apihost+'/api/Attendance/GetAttendanceList', {
			dataType: 'json',
			data: JSON.stringify(postData),
			type: 'post',
			timeout: 10000,
			headers: headers,
			success: function(data) {
				console.log("SUCCESS:"+JSON.stringify(data));
				vmObj(data);
			},
			error: function(xhr, type, errorThrown) {
				console.log(JSON.stringify(xhr));
			},
			beforeSend: function() {
		        plus.nativeUI.showWaiting('正在加载...');
		        mask.show();//显示遮罩层
		    },
		    complete: function() {
		        plus.nativeUI.closeWaiting();
		        mask.close();//关闭遮罩层
		    }
		});
	}
}



function serializeJSON(form){
	var jsonData = {};
	var elements = form.elements;
	var checkboxName = null;
	for(var i = 0, len = elements.length; i < len; i++ ) {
		var field = elements[i];
		switch (field.type) {
			case "select-one":
			case "select-multiple":
			    jsonData[encodeURIComponent(field.name)] = encodeURIComponent(this.getSelectValue(field));
				break;
			case undefined :
			break;
			case "button":
				jsonData[encodeURIComponent(field.name)] =encodeURIComponent(field.innerText);
				break;
			case "submit" :
			case "reset" :
			case "file" :
			break;
			case "checkbox" :
				if(checkboxName == null) {
					checkboxName = field.name;
					jsonData[encodeURIComponent(checkboxName)] = encodeURIComponent(this.getCheckboxValue(form.elements[checkboxName]));
				}
				break;
			case "radio" :
				if(!field.checked) {
					break;
				}
			default:
				if(field.name.length > 0) {
					jsonData[encodeURIComponent(field.name)] =encodeURIComponent(field.value);
				} 
		}
	}
	return jsonData;
} 
