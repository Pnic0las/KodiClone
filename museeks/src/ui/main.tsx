/*
|--------------------------------------------------------------------------
| React and Router
|--------------------------------------------------------------------------
*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Root from './Root';
import Router from './router/Router';
import store from './store';

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/

import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
import 'react-rangeslider/lib/index.css';
import './styles/main.css';

/*
|--------------------------------------------------------------------------
| Render the app
|--------------------------------------------------------------------------
*/

ReactDOM.render(
  <Root>
    <Provider store={store}>
      <Router />
    </Provider>
  </Root>,
  document.getElementById('wrap')
);
