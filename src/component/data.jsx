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
          <div className="result data">
            <p className="index">{this.state.index}</p>
            <p className="isbn">{this.state.value}</p>
            <p className="library">{this.state.data.target}</p>
            <p className="url">
              <a
                href={this.state.data.url}
                target="_blank"
              >
                連結
              </a>
            </p>
          </div>
          :
          <div className="result data">
            <p className="index">{this.state.index}</p>
            <p className="isbn">{this.state.value}</p>
            <p className="library">讀取中</p>
            <p className="url">讀取中</p>
          </div>
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
