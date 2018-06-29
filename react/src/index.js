import React from 'react';
import ReactDOM from 'react-dom';
import services from "api/services";
import 'normalize.css';
import 'css/main-styles.css';
import App from 'components/App';
import 'images/folder.svg';
import 'images/list-view.svg';
import 'images/grid-view.svg';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App services={services}/>, document.getElementById('react'));
registerServiceWorker();
