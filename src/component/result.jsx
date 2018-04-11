import React from 'react';
import PropTypes from 'prop-types';
import Data from './data.jsx';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      container: this.props.container,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      container: nextProps.container,
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="result header">
          <p>編號</p>
          <p>ISBN</p>
          <p>已配對圖書館</p>
          <p>已配對網址</p>
        </div>
        {
          this.state.container.map((value, index) => {
            return <Data index={index + 1} value={value} />;
          })
        }
      </React.Fragment>
    );
  }
}

Result.propTypes = {
  container: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Result;
