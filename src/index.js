import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Header from './Header';
import Content from './Content';
import createStore from './createStore';
import { isEmpty } from 'lodash';
import Provider from './react-redux';
import { applyMiddleware } from './applyMiddleware';
import { logger } from 'redux-logger';
import { ajax } from 'rxjs/observable/dom/ajax';
import { delay } from 'rxjs';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
const themeStore = {
  themeColor: 'red',
};

const pingEpic = action$ =>
  action$.ofType('PING')
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: 'PONG' });


const fetchUserEpic = action$ =>
  action$.ofType('FETCH_USER')
    .mergeMap((action) =>
        ajax.getJSON(`https://api.github.com/users/${action.payload}`)
          .map(response => fetchUserFulfilled(response))
    );

function fetchUserFulfilled (payload) {
  debugger;
  return {
    type: 'FETCH_USER_FILL',
    payload,
  }
}

const rootEpic = combineEpics(pingEpic, fetchUserEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);

const ThemeReducer = (state, action) => {
  if (isEmpty(state)) {
    state = themeStore;
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {...state, themeColor: action.themeColor};
    case 'PING':
      return {...state, isPinging: true };
    case 'PONG':
      return {...state, isPinging: false };
    case 'FETCH_USER_FILL':
      return {...state, [action.payload.login]: action.payload};
    default:
      return state;
  }
}

const store = applyMiddleware(logger, epicMiddleware)(createStore)(ThemeReducer);
// const store = createStore(ThemeReducer);

class Index extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
