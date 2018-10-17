import doc1 from'./doc/doc-1.md';
import doc2 from'./doc/doc-2.md';
import style from './css/style.css';

const container = document.querySelector('.container');

// const strTpl = `ES6->ES5`
// document.write(strTpl)

container.innerHTML= doc1 + doc2;