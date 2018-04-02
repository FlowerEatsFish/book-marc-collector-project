import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setIsbnPool } from '../action.jsx';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }
  handleClick() {
    const { onSetIsbnPool } = this.props;
    console.log(`value: ${this.state.value}`);
    onSetIsbnPool(this.state.value);
  }
  render() {
    return (
      <div className="input">
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="請輸入欲查詢的 ISBN"
        />
        <input type="button" value="送出" onClick={this.handleClick} />
      </div>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onSetIsbnPool: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  const result = {
    onSetIsbnPool: (val) => {
      dispatch(setIsbnPool(val));
    },
  };
  return result;
};

const ReduxInput = connect(
  null,
  mapDispatchToProps,
)(Input);

export default ReduxInput;
