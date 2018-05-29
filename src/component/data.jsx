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
  }
  async componentWillMount() {
    const data = await parser(this.state.value);
    this.setState({
      library: data.target,
      url: data.url,
    });
  }
  render() {
    return (
      <div className="result data">
        <p className="index">{this.state.index}</p>
        <p className="isbn">{this.state.value}</p>
        <p className="library">
          { this.state.library ?
            this.state.library :
            '搜尋中'
          }
        </p>
        <p className="url">
          { this.state.url ?
            <a
              href={this.state.url}
              target="_blank"
            >
              連結
            </a> :
            null
          }
        </p>
      </div>
    );
  }
}

Data.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

export default Data;
