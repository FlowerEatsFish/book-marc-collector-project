import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Result extends React.Component {
  render() {
    const { container } = this.props;
    return (
      <div>
        <table className="result">
          <thead>
            <tr>
              <th>編號</th>
              <th>ISBN</th>
              <th>已配對圖書館</th>
              <th>已配對網址</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{container}</td>
              <td>國立淡江大學</td>
              <td>https://github.com/</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1234567890123</td>
              <td>國立成功大學</td>
              <td>https://github.com/</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Result.propTypes = {
  container: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const result = {
    container: state.book.container,
  };
  return result;
};

const ReduxResult = connect(
  mapStateToProps,
  null,
)(Result);

export default ReduxResult;
