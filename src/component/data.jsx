import React from 'react';
import PropTypes from 'prop-types';
import parser from '../parser/parser.js';

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      data: null,
      value: this.props.value,
    };
    console.log(`index: ${this.state.index}`);
    console.log(`value: ${this.state.value}`);
  }
  async componentWillMount() {
    this.setState({
      data: await parser(this.state.value),
    });
  }
  render() {
    return (
      <React.Fragment>
        { this.state.data ?
          <tr>
            <td>{this.state.index}</td>
            <td>{this.state.value}</td>
            <td>{this.state.data.target}</td>
            <td>
              <a
                href={this.state.data.url}
                target="_blank"
              >
                連結
              </a>
            </td>
          </tr>
          :
          <tr>
            <td>{this.state.index}</td>
            <td>{this.state.value}</td>
            <td>讀取中</td>
            <td>讀取中</td>
          </tr>
        }
      </React.Fragment>
    );
  }
}

Data.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

export default Data;
