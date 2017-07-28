/**
 * applyMiddleware 是一个柯里化后的高阶函数
 * 首先返回一个函数 接受createStore作为参数
 * 这个函数又返回一个依次接受reducer， initialState，以及enhancer作为参数的函数
 * redux中间件主要原理是改造dispatch函数
 */

export const applyMiddleware = (...middlewares) => {
  return (createStore) => (reducer, initialState, enhancer) => {
    // 缓存store所返回的dispatch 
    const store = createStore(reducer, initialState, enhancer);
    let dispatch = store.dispatch;
    let chain = [];

    // 缓存store的getState和dispatch方法
    const middlewareApi = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    }

    // 遍历中间件数组并运行 将store的两个方法传进去
    chain = middlewares.map((middleware) => middleware(middlewareApi));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  }
}


export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  
  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

