import React, { PureComponent, PropTypes } from 'react';

export const connect = (mapStateToprops, mapDispatchToProps) => (WrappedComponent) => {
  let stateToProps = mapStateToprops;
  let dispatchToProps = mapDispatchToProps;
  class Connect extends PureComponent {
    static contextTypes = {
      store: PropTypes.object,
    }
    constructor() {
      super();
      this.state = { allProps: {} };
    }

    componentWillMount() {
      const { store } = this.context;
      this._updateProps();
      store.subscribe(() => this._updateProps());
    }

    _updateProps() {
      const { store } = this.context;
      let stateProps = stateToProps ? stateToProps(store.getState(), this.props) : {};
      let dispatchProps = dispatchToProps ? dispatchToProps(store.dispatch, this.props): {};
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      });
    }
    /**
     * 将store的数据取出来
     * 将每个组件所需要的state通过mapStateToProps函数返回出来
     */

    render() {
      return (
        <WrappedComponent {...this.state.allProps} />
      );
    }
  }
  return Connect;
}

export default class Provider extends PureComponent {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any,
  }
  
  static childContextTypes = {
    store: PropTypes.object,
  }

  getChildContext() {
    return {
      store: this.props.store,
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

