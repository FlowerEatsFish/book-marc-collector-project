import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setIsbnPool } from '../action.jsx';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }
  async handleClick() {
    const { onSetIsbnPool } = this.props;
    await onSetIsbnPool('');
    await onSetIsbnPool(this.state.value);
  }
  render() {
    return (
      <div className="input">
        <input
          className="text"
          onChange={this.handleChange}
          placeholder="請輸入欲查詢的 ISBN"
          type="text"
          value={this.state.value}
        />
        <input
          className="submit"
          onClick={this.handleClick}
          type="button"
          value="送出"
        />
      </div>
    );
  }
}

Input.propTypes = {
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
