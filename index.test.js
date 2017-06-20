'use strict';

var DateParser = require('./index.js');
var expect = require('chai').expect;

var parseArr = [
	'2018-1-1',
	'2018年11月1日',
	'02/02/2018',
	'2018/02/28',
	'2018*01*20 12:00'
];

var formatArr = [{
	date: new Date('2018-01-01 12:01'),
	format: 'YYYY-MM-DD hh:mm'
}, {
	date: new Date('2018-1-1 3:02'),
	format: 'YYYY年MM月DD日 hh时mm分'
}, {
	date: new Date('2018-07-1'),
	format: 'YYYY年MM月DD日'
}, {
	date: new Date('2018-07-14'),
	format: 'YYYY年MM月DD日 hh:mm:ss'
}, {
	date: new Date('2018-08-15'),
	format: 'YYYYMMDD'
}, {
	date: '2018-08-15',
	format: 'YYYYMMDD'
}, {
	date: 13452323232323,
	format: undefined
}, {
	date: 13452323232323,
	format: 'YYYYMMDD'
}];



describe('DateParser.parse方法测试', () => {
	it(`${parseArr[0]} 测试parse方法,用例1`, () => {
		expect(DateParser.parse(parseArr[0]).getTime()).to.be.equal((new Date('2018-01-01 00:00')).getTime())
	})
	it(`${parseArr[1]} 测试parse方法,用例2`, () => {
		expect(DateParser.parse(parseArr[1]).getTime()).to.be.equal((new Date('2018-11-01 00:00')).getTime())
	})
	it(`${parseArr[2]} 测试parse方法,用例3`, () => {
		expect(DateParser.parse(parseArr[2]).getTime()).to.be.equal((new Date('2018-02-02 00:00')).getTime())
	})
	it(`${parseArr[3]} 测试parse方法,用例4`, () => {
		expect(DateParser.parse(parseArr[3]).getTime()).to.be.equal((new Date('2018-02-28 00:00')).getTime())
	})
	it(`${parseArr[4]} 测试parse方法,用例5`, () => {
		expect(DateParser.parse(parseArr[4]).getTime()).to.be.equal((new Date('2018-01-20 12:00')).getTime())
	})
});

describe('DateParser.format方法测试', () => {
	it('format测试用例1', () => {
		expect(DateParser.format(formatArr[0].date, formatArr[0].format)).to.be.equal('2018-01-01 12:01')
	})
	it('format测试用例2', () => {
		expect(DateParser.format(formatArr[1].date, formatArr[1].format)).to.be.equal('2018年01月01日 03时02分')
	})
	it('format测试用例3', () => {
		expect(DateParser.format(formatArr[2].date, formatArr[2].format)).to.be.equal('2018年07月01日')
	})
	it('format测试用例4', () => {
		expect(DateParser.format(formatArr[3].date, formatArr[3].format)).to.be.equal('2018年07月14日 08:00:00')
	})
	it('format测试用例5', () => {
		expect(DateParser.format(formatArr[4].date, formatArr[4].format)).to.be.equal('20180815')
	})
	it('format测试用例6', () => {
		expect(DateParser.format(formatArr[5].date, formatArr[5].format)).to.be.equal('20180815')
	})
	it('format测试用例7', () => {
		expect(DateParser.format(formatArr[6].date, formatArr[6].format)).to.be.equal('')
	})
	it('format测试用例8', () => {
		expect(DateParser.format(formatArr[7].date, formatArr[7].format)).to.be.equal('23960415')
	})
});