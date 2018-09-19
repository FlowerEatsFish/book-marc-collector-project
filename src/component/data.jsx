import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Input } from 'antd';
import parser from '../parser/parser';

class Data extends React.Component {
  constructor(props) {
    super(props);
    const { index, value } = this.props;
    this.state = {
      index,
      library: null,
      url: null,
      value,
    };
  }

  async componentWillMount() {
    const { value } = this.state;
    const data = await parser(value);
    this.setState({
      library: data.target,
      url: data.url,
    });
  }

  render() {
    const {
      index, value, library, url,
    } = this.state;
    return (
      <div className="result data">
        <p className="index">
          {index}
        </p>
        <p className="isbn">
          {value}
        </p>
        <p className="library">
          {library ? library : '搜尋中'}
        </p>
        <p className="url">
          { url
            ? (
              <a href={url} target="_blank">
                連結
              </a>
            )
            : null
          }
        </p>
        <p className="check">
          <Checkbox />
        </p>
        <p className="note">
          <Input />
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
