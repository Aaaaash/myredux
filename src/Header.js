import React, { PureComponent, PropTypes } from 'react';
import { connect } from './react-redux';


class Header extends PureComponent {
  
  render() {
    return (
      <h1 style={{ color: this.props.themeColor }}>react.js 小书</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor,
  }
}

export default connect(mapStateToProps)(Header);
