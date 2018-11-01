import doc1 from './doc/doc-1.md';
import doc2 from './doc/doc-2.md';
import "react";
import "react-dom";
import './css/style.css';

import 'purecss';

const container = document.querySelector('.container');

// const strTpl = `ES6->ES5`
// document.write(strTpl)
container.innerHTML = doc1 + doc2;
// const b = 3 3;
// console.log(b);

document
	.querySelectorAll('h2')
	.forEach((item, i) => {
		item.className = 'pure-button'
	})