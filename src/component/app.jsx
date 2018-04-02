import React from 'react';
import Title from './title.jsx';
import Input from './input.jsx';
import Result from './result.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="master">
        <Title />
        <Input />
        <Result />
      </div>
    );
  }
}

export default App;
