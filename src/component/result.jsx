import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Data from './data';

class Result extends React.Component {
  render() {
    const { container } = this.props;
    return (
      <div className="result-nav">
        <div className="result header">
          <p>
            編號
          </p>
          <p>
            ISBN
          </p>
          <p>
            已配對圖書館
          </p>
          <p>
            已配對網址
          </p>
          <p>
            標記
          </p>
          <p>
            註解
          </p>
        </div>
        { container.map((value, index) => <Data index={index + 1} value={value} />) }
      </div>
    );
  }
}

Result.propTypes = {
  container: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
};

const mapStateToProps = (state) => {
  const result = {
    container: state.book.container,
  };
  return result;
};

export default connect(mapStateToProps, null)(Result);
