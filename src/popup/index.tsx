import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/app';
import 'style/index.css';

const container = document.createElement('popup');
document.body.appendChild(container);

const root = createRoot(container);
root.render(<App />);

console.log('Popup 👋');
