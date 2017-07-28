import React, { PureComponent, PropTypes } from 'react';
import ThemeSwitch from './ThemeSwitch';
import { connect } from './react-redux';

class Content extends PureComponent {
  
  render() {
    return (
      <div>
        <p style={{ color: this.props.themeColor }}>React 小书内容</p>
        <ThemeSwitch />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor,
  }
};

export default connect(mapStateToProps)(Content);
