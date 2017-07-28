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

const themeStore = {
  themeColor: 'red',
};

const ThemeReducer = (state, action) => {
  if (isEmpty(state)) {
    state = themeStore;
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {...state, themeColor: action.themeColor};
    default:
      return state;
  }
}

const store = applyMiddleware(logger)(createStore)(ThemeReducer);
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
