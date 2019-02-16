import React from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class SearchForm extends React.Component { 
  constructor() { 
    super();
    this.state = {
      artist: '',
      date: '', 
      formErrors: {
        validArtist: '', 
        validDate: ''
      },
    }
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) { 
    event.preventDefault();
    const {name, value} = event.target;
    let formErrors = { ...this.state.formErrors };
  
    switch(name) { 
      case 'artist':
        console.log('LENGTH', value.length);
        console.log('REGEX', artistCheck.test(value));
        console.log(formErrors.validArtist);
        //reassiging changing state
        formErrors.validArtist = (artistCheck.test(value) && value.legnth > 1) ? '' : `Artist name field can only contain alpha numeric characters and spaces, sorry AC/DC fans.`;
        break;
      case 'date': 
        formErrors.validDate = true ? '' : ' is invalid';
        break;
      default: 
        break;
    }
    
    this.setState({formErrors, [name]: value}, () => console.log(this.state)); 
  }
  
  handleSubmit(event) { 
    // event.preventDefault();
    // if (formValid(this.state.formErrors)) { 
    //   this.setState({[event.target.name]: event.target.value})
    // } else { 
    //   console.log('No'); 
    // }
  }
  
  render() { 
    return ( 
      <div>
        {console.log(this.state)}
        <form onSubmit={this.handleSubmit}>
          <label>Artist:</label>
          <input 
            type="text" 
            name="artist" 
            placeholder="Artist" 
            onChange={this.handleChange}
          />
          <DayPickerInput onDayChange={day => console.log(day)}/>
          <button>Search</button>
        </form>
      </div>
    );
  }
}

const artistCheck = RegExp('^[a-zA-Z0-9 ]*$'); 

const formValid = (formErrors) => { 
  let valid = true;
  Object.values(formErrors).forEach(error => {
    error.legnth > 0 && (valid = flase);
  });
  return valid; 
}

export default SearchForm;