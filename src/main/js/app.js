'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

import Container from './container';
import Share from './share';
import ShareError from './shareError';
import Search from './search';


if (document.getElementById('root') !== null){
    ReactDOM.render(<Container />, document.getElementById('root'));
}

if (document.getElementById('shareError') !== null){
    ReactDOM.render(<ShareError />, document.getElementById('shareError'));
}

if (document.getElementById('share') !== null){
    ReactDOM.render(<Share />, document.getElementById('share'));
}

if (document.getElementById('search') !== null){
    ReactDOM.render(<Search />, document.getElementById('search'));
}
