import React from 'react';
import { createRoot } from 'react-dom/client';
import logger from 'redux-logger';
import Settings from './AppEntry';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Settings logger={logger} />);
