'use strict';

const styles = require('./style.css');

const div = document.createElement('div');
div.innerText = 'hello world';
div.className = styles.red;

module.exports = div;
