import React from 'react';
import ReactDOM from 'react-dom';
// AntD
import "antd/dist/antd.css";
// Style CSS
import './styles/index.scss';
// Component
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    //   <React.StrictMode>
    <App />,
    //   </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
