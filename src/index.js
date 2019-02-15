import React from "react";
import ReactDOM from "react-dom";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

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
    //   artistValid: false,
    //   dateValid: false,
    //   formValid: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { 
    console.log(this.state);
    const {name, value} = event.target;
    let formErrors = this.state.formErrors; 
    // let artistValid = this.state.artistValid;
    // let dateValid = this.state.dateValid;

    switch(name) { 
      case "artist":
        const artistCheck = RegExp('^[a-zA-Z0-9 ]*$'); 
        formErrors.artist = artistCheck.test(value) && value.legnth > 0 ? '' : `Artist name field can only contain alpha numeric characters and spaces, sorry AC/DC fans.`;
        break;
      case "date": 
        dateValid = 
        formErrors.dateValid = dateValid ? '' : ' is invalid';
        break;
      default: 
        break;
    }

    this.setState({formErrors, [name]: value}, () => console.log(this.state)); 
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
        </label>
        <DayPickerInput onDayChange={day => console.log(day)}/>
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