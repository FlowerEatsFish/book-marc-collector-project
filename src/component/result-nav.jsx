import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Result from './result.jsx';

class ResultNav extends React.Component {
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
      <div className="result-nav">
        { this.state.container
        ? <Result container={this.state.container} />
        : null
        }
      </div>
    );
  }
}

ResultNav.propTypes = {
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

const ReduxResultNav = connect(
  mapStateToProps,
  null,
)(ResultNav);

export default ReduxResultNav;
