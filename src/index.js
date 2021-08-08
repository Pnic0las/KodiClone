import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';



// var theme = darkTheme

ReactDOM.render(
  // <MuiThemeProvider>
  <React.StrictMode>
      <CssBaseline />
      <App />
  </React.StrictMode>,
  // </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// functi"on switchLight() {
//   theme = lightTheme;
// }

// function switchDark() {
//   theme = darkTheme
// }

// const body = document.body;
// new ClassWatcher(body, 'light', switchLight);
// new ClassWatcher(body, 'dark', switchDark);"

serviceWorker.unregister();
