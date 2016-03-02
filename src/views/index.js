import React from 'react'
import ReactDom from 'react-dom'
import {Images} from '../components/images'

var app = document.getElementById('app');
ReactDom.render(React.createElement(Images), app);
