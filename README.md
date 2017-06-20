## date-mutare

This is component for simple parsing date for string that you wants, You should use it with commonjs at least.

## Change logs
* 0.0.2 add readme
* 0.0.3 fix bug and add unit test by mocha
* 1.0.0 little changes and add a method to view regular expression which used in component

## How to import in ES2015
```js
import DateParser from 'date-mutare';
```

## Usage
```js
/**
* @description: parse string of date to date obj
* @param: {string}
* @return: {Date}
*/
DateParser.parse
/**
* @description: format date obj to a date string 
* @param: {Date object|string|number} date object or string
* @param: {string} string of formating date
* @return: {string} date string
*/
DateParser.format
/**
* @description: view regular expression which used in component
* @return: {string} regular string
*/
DateParser.info
```
