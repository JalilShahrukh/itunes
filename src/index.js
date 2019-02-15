import React from "react";
import ReactDOM from "react-dom";

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

class SearchForm extends React.Component { 
  constructor() { 
    super();
    this.state = {
      artist: '',
      date: '', 
      formErrors: {
        artist: '', 
        date: ''
      },
      artistValid: false,
      dateValid: false,
      formValid: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { 
    console.log(this.state);
    const {name, value} = event.target;
    let formErrors = this.state.formErrors; 

    switch(name) { 
      case "artist": 
        break;
      case "date": 
        break;
      default: 
    }
  }

  handleSubmit(event) { 
    event.preventDefault();
    if (formValid(this.state.formErrors)) { 
      this.setState({[event.target.name]: event.target.value})
    } else { 
      
    }
  }

  render() { 
    return ( 
      <form onSubmit={this.handleSubmit}>
        <label> 
          Artist:
          <input type="text" name="artist" placeholder="Artist" onChange={this.handleChange}/>
          Date Range:
          <input type="text" name="date" placeholder="Dates" onChange={this.handleChange}/>
        </label>
        <button>Search</button>
      </form>
    );
  }
}

const formValid = (formErrors) => { 
  let valid = true;
  Object.values(formErrors).forEach(error => {
    error.legnth > 0 && (valid = flase);
  });
  return valid; 
}

ReactDOM.render(<App />, document.getElementById('root'));