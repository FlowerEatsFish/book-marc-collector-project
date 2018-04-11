import React from 'react';
import PropTypes from 'prop-types';
import parser from '../parser/parser.js';

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      library: null,
      url: null,
      value: this.props.value,
    };
    console.log(`index: ${this.state.index}`);
    console.log(`value: ${this.state.value}`);
  }
  async componentDidMount() {
    const data = await parser(this.state.value);
    this.setState({
      library: data.target,
      url: data.url,
    });
  }
  async componentWillReceiveProps(nextProps) {
    this.setState({
      index: nextProps.index,
      value: nextProps.value,
      library: null,
      url: null,
    });
    const data = await parser(nextProps.value);
    this.setState({
      library: data.target,
      url: data.url,
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="result data">
          <p className="index">{this.state.index}</p>
          <p className="isbn">{this.state.value}</p>
          <p className="library">
            { this.state.library
            ? this.state.library
            : '搜尋中'
            }
          </p>
          <p className="url">
            { this.state.url ?
              <a
                href={this.state.url}
                target="_blank"
              >
                連結
              </a>
            : null
            }
          </p>
        </div>
      </React.Fragment>
    );
  }
}

Data.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

export default Data;
