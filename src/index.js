import React from "react";
import ReactDOM from "react-dom";
import Search from './components/Search';

class App extends React.Component { 
  render() { 
    return (
      <div>
        <Search />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));