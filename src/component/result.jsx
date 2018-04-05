import React from 'react';
import PropTypes from 'prop-types';
import Data from './data.jsx';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      container: this.props.container,
      html: null,
    };
    console.log(`this.state.container: ${this.state.container}`);
  }
  componentWillMount() {
    const html = [];
    if (this.state.container) {
      this.state.container.forEach((value, index) => {
        html.push(<Data index={index + 1} value={value} />);
      });
      this.setState({
        html,
      });
    }
  }
  render() {
    return (
      <table className="result-nav">
        <thead>
          <tr>
            <th>編號</th>
            <th>ISBN</th>
            <th>已配對圖書館</th>
            <th>已配對網址</th>
          </tr>
        </thead>
        <tbody>
          {this.state.html}
        </tbody>
      </table>
    );
  }
}

Result.propTypes = {
  container: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Result;
