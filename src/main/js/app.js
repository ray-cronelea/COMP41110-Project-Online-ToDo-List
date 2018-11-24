'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

import Container from './container';
import Share from './share';
import ShareError from './shareError';


if (document.getElementById('root') !== null){
    ReactDOM.render(<Container />, document.getElementById('root'));
} else {
    console.log("Element root has not been found.");
}

if (document.getElementById('shareError') !== null){
    ReactDOM.render(<ShareError />, document.getElementById('shareError'));
} else {
    console.log("Element shareError has not been found.");
}

if (document.getElementById('share') !== null){
    ReactDOM.render(<Share />, document.getElementById('share'));
} else {
    console.log("Element share has not been found.");
}

