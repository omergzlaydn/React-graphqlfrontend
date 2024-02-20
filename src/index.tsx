// index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/tailwind.css'; // Tailwind CSS dosyasını içe aktarın

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

