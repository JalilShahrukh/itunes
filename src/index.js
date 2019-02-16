import React from "react";
import ReactDOM from "react-dom";
import SearchForm from './components/SearchFrom';

class App extends React.Component { 
  render() { 
    return (
      <div>
        <Header />
        <SearchForm />
      </div>
    );
  }
}

const Header = () => {return (<h1>Which songs are you looking for?</h1>);}

ReactDOM.render(<App />, document.getElementById('root'));