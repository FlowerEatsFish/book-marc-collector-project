import React from 'react';
import Title from './title.jsx';
import Input from './input.jsx';
import ResultNav from './result-nav.jsx';
import '../style/master.scss';

class App extends React.Component {
  render() {
    return (
      <div className="master">
        <Title />
        <Input />
        <ResultNav />
      </div>
    );
  }
}

export default App;
