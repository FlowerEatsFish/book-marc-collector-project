import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Result from './result.jsx';

class ResultNav extends React.Component {
  render() {
    const { container } = this.props;
    return (
      <div className="result-nav">
        { container
        ? <Result container={container} />
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
