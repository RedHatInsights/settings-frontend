import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
import Settings from './AppEntry';

ReactDOM.render(<Settings logger={logger} />, document.getElementById('root'));
