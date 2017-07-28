/**
 * 
 * @param {*} state 状态
 * @param {*} reducer 变化函数 
 * 
 * 返回一个包含getState和dispatch方法以及subscribe方法的对象
 * getState用于获取state数据
 * dispatch用于修改数据 接受一个action
 * subscribe用于传递监听函数
 * 然后将state和action传递给stateChanger函数
 * 
 * store无法自动更新页面视图数据，需要一个观察者模式来监听数据变化重新渲染页面
 * 调用store.subscribe方法
 */

export const ActionTypes = {
  INIT: '@@redux/INIT'
}

const createStore = (reducer, initialState = {}) => {
  let state = initialState;
  // 监听队列
  const listeners = [];
  // 订阅方法
  const subscribe = (listener) => {
    listeners.push(listener)
  };

  const getState = () => state;

  /**
   * 
   * @param {*} action
   * 每次调用store.dispatch方法 内部会自动遍历监听列表并执行监听函数
   * reducer方法每次都会返回新的state对象
   * 所以在dispatch一个action时将原来的state替换为reducer返回的对象
   */
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }
  dispatch({ type: ActionTypes.INIT });
  return { getState, dispatch, subscribe };
}

export default createStore;
