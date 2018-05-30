import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { setIsbnPool } from '../action';

const Search = Input.Search;

class InputBlock extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  async handleClick(value) {
    const { onSetIsbnPool } = this.props;
    await onSetIsbnPool('');
    await onSetIsbnPool(value);
  }
  render() {
    return (
      <div className="input">
        <Search
          placeholder="請輸入欲查詢的 ISBN"
          onSearch={value => this.handleClick(value)}
          enterButton
        />
      </div>
    );
  }
}

InputBlock.propTypes = {
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

export default connect(null, mapDispatchToProps)(InputBlock);
