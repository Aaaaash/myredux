import React, { PureComponent, PropTypes } from 'react';
import ThemeSwitch from './ThemeSwitch';
import { connect } from './react-redux';

class Content extends PureComponent {
  
  render() {
    const { isPinging, onFetch } = this.props;
    return (
      <div>
        <p style={{ color: this.props.themeColor }}>React 小书内容</p>
        <ThemeSwitch />
        <button onClick={onFetch}>fetch</button>
        {isPinging && <button>加载~~~</button>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor,
    isPinging: state.isPinging,
  }
};

const mapDisPatchToProps = (dispatch) => {
  return {
    onFetch: () => dispatch({ type: 'FETCH_USER', payload: 'SAKUB' }),
  }
};

export default connect(mapStateToProps, mapDisPatchToProps)(Content);
