"use strict";

var _dateReg = /YYYY-MM-DD HH:mm:ss/;

var _mainReg = /^(\d{4})\W(\d{1,2})\W(\d{1,2})/;
var _mainReg2 = /^(\d{1,2})\W(\d{1,2})\W(\d{4})/;

var _detailMainReg = /\d{1,2}:\d{1,2}:?\d{0,2}$/;
var _detailReg = /(\d{1,2}):(\d{1,2}):?(\d{0,2})$/;

var DateParser = {
	/**
	 * @description: 转换日期字符串为日期对象,对于不能解析的所有情况将会抛出一个当前日期的date对象
	 * @param: {string} 需要转换的日期字符串
	 * @return: {Date} 日期对象
	 */
	parse: function(dateString) {
		if (typeof(dateString) !== 'string') {
			console.error('Illegal parameter type.');
			return new Date();
		}
		if (!dateString) {
			console.error('Parameter can not be null.');
			return new Date();
		}

		dateString = dateString.trim();

		var resultString, resultArr = [];

		//获取年月日信息
		if (_mainReg.test(dateString)) {
			resultString = dateString.replace(_mainReg, '$1,$2,$3');
		} else if (_mainReg2.test(dateString)) {
			resultString = dateString.replace(_mainReg2, '$3,$1,$2');
		} else {
			console.error('Not support this dateString');
			return new Date();
		}

		resultArr = resultString.split(',');

		var yearInt = parseInt(resultArr[0]),
			monthInt = parseInt(resultArr[1]),
			dateInt = parseInt(resultArr[2]);

		//获取时：分信息
		var timeRes, timeStr, timeArr;
		if (_detailMainReg.test(dateString)) {
			timeRes = dateString.match(_detailMainReg);
			if (timeRes && timeRes[0] && _detailReg.test(timeRes[0])) {
				timeStr = timeRes[0].replace(_detailReg, '$1,$2,$3');
			}
		}

		timeArr = timeStr && timeStr.split(',') || [];

		var hourInt = parseInt(timeArr[0]) || 0,
			minInt = parseInt(timeArr[1]) || 0,
			secInt = parseInt(timeArr[2] || 0);

		//构造日期对象
		var resDate = new Date();

		resDate.setHours(hourInt, minInt, secInt, 0);
		resDate.setDate(dateInt);
		resDate.setMonth(monthInt - 1);
		resDate.setFullYear(yearInt);

		return resDate;
	},
	/**
	 * @description: 格式化日期对象为日期字符串
	 * @param: {date|string|number} 日期对象
	 * @param: {string} 格式化的样例字符串 如YYYY-MM-DD hh:mm:ss
	 * @return: {string} 符合目标的日期字符串
	 */
	format: function(dateObj, dateFormatString) {
		if (!dateObj || !dateFormatString) {
			return console.error('Parameter can not be null.');
		}
		if (typeof(dateObj) === 'string' || typeof(dateObj) === 'number') {
			dateObj = new Date(dateObj);
		}
		if (!(dateObj instanceof Date) || dateObj.toString() === 'Invalid Date') {
			return console.error('Illegal parameter type');
		}

		if (typeof(dateFormatString) !== 'string') {
			return console.error('Illegal parameter type');
		}
		var yearInt = dateObj.getFullYear() + '',
			monthInt = dateObj.getMonth() + 1 + '',
			dateInt = dateObj.getDate() + '',
			hourInt = dateObj.getHours() + '',
			minInt = dateObj.getMinutes() + '',
			secInt = dateObj.getSeconds() + '';

		monthInt = monthInt.length > 1 ? monthInt : '0' + monthInt;
		dateInt = dateInt.length > 1 ? dateInt : '0' + dateInt;
		hourInt = hourInt.length > 1 ? hourInt : '0' + hourInt;
		minInt = minInt.length > 1 ? minInt : '0' + minInt;
		secInt = secInt.length > 1 ? secInt : '0' + secInt;

		var resStr = '';
		var years = dateFormatString.match(/Y/g) || [];
		var months = dateFormatString.match(/M/g) || [];
		var dates = dateFormatString.match(/D/g) || [];
		var hours = dateFormatString.match(/h/g) || [];
		var mins = dateFormatString.match(/m/g) || [];
		var secs = dateFormatString.match(/s/g) || [];

		dateFormatString = dateFormatString.replace(/Y+/, yearInt.slice(yearInt.length - years.length));
		dateFormatString = dateFormatString.replace(/M+/, monthInt.slice(monthInt.length - months.length));
		dateFormatString = dateFormatString.replace(/D+/, dateInt.slice(dateInt.length - dates.length));
		dateFormatString = dateFormatString.replace(/h+/, hourInt.slice(hourInt.length - hours.length));
		dateFormatString = dateFormatString.replace(/m+/, minInt.slice(minInt.length - mins.length));
		dateFormatString = dateFormatString.replace(/s+/, secInt.slice(secInt.length - secs.length));

		return dateFormatString;
	},
	/**
	 * @description: 打印用于匹配的正则表达式
	 * @return: {string} 正则表达式字符串
	 */
	info: function() {
		console.log(_dateReg.toString());
	}
};

module.exports = DateParser;