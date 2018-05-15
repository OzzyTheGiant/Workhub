import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'css/main-styles.css';
import App from 'components/App';
import 'folder.svg';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('react'));
registerServiceWorker();
