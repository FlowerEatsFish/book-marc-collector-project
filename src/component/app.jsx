import React from 'react';
import Title from './title';
import Input from './input';
import Result from './result';
import '../style/master.scss';

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
