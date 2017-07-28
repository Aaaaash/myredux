import React, { PureComponent, PropTypes } from 'react';
import { connect } from './react-redux';
class ThemeSwitch extends PureComponent {
  render() {
    const { themeColor, onSwitchColor } = this.props;
    return (
      <div>
        <button
          style={{ color: themeColor }}
          onClick={() => onSwitchColor('red')}
        >
          red
        </button>
        <button
          style={{ color: themeColor }}
          onClick={() => onSwitchColor('blue')}
        >
          blue
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor,
  }
};

const mapDisPatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => dispatch({ type: 'CHANGE_COLOR', themeColor: color }),
  }
};

export default connect(mapStateToProps, mapDisPatchToProps)(ThemeSwitch);
