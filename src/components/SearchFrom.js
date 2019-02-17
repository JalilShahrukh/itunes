import React from "react";

// Regex to match alpha numeric characters and spaces. 
const artistRegex = RegExp("^[a-zA-Z0-9 ]*$");

// Function to validate form errors being empty.
const formValid = ({ formErrors }) => {
  let valid = true;

  Object.values(formErrors).forEach(error => {
    (valid = false) && error.length > 0;
  });

  return valid;
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: '',
      formErrors: {
        artist: '',
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Function to handle user submit.
  handleSubmit(e) {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`Artist: ${this.state.artist}`);
    } else {
      console.error(`Artist name field can only contain alpha numeric characters and spaces, sorry AC/DC fans.`);
    }
  };

  // Function to handle input change.
  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'artist':
        formErrors.artist = artistRegex.test(value) ? '' : 'Invalid artist ';
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="artistContainer">
          <label htmlFor="artist">Artist</label>
          <input placeholder="Artist" type="artist" name="artist" onChange={this.handleChange}/>
          {formErrors.artist.length > 0 && (<span>{formErrors.artist}</span>)}
        </div>

        <div className="date">

        </div>
        
        <div className="Search">
          <button type="submit">Search</button>
        </div>

      </form>
    );
  }
}

export default SearchForm;