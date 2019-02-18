import React from 'react';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

// API URL.
const API = "https://itunes.apple.com/search?term=";

// Regex to match alpha numeric characters and spaces. 
const artistRegex = RegExp("^[a-zA-Z0-9 ]*$");

// Function to validate form errors being empty.
const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach(error => {
    error.length > 0 && (valid = false);
  });

  return valid;
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      songs: [],
      formErrors: {
        artist: '',
        songs: ''
      },
      isLoading: false,
      error: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Function to request data from API.
  handleSearch(query) { 
    this.setState({isLoading: true}); 

    axios.get(API + query.split(' ').join('+'), { adapter: jsonpAdapter })
      .then(res => 
        this.setState({
         songs: res.data.results,
         isLoading: false
        })
      )
      .catch(error => this.setState({
        error,
        isLoading: false
      }))
  }

  // Function to handle user submit.
  handleSubmit(e) {
		e.preventDefault();
		const { formErrors, artist } = this.state;

    if (formValid(formErrors)) {
      this.handleSearch(artist);
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
    const { formErrors, songs, isLoading } = this.state;

    return (
			<div className="page-wrapper">
				<form onSubmit={this.handleSubmit}>
						<label>Artist</label>
						<input 
						  type="text"
							placeholder="Artist" 
							type="artist" 
							name="artist"
							onChange={this.handleChange}
						/>
						{formErrors.artist.length > 0 ? (<span>{formErrors.artist}</span>) : (<span></span>)}

				  <div className="search-btn">
					  <button type="submit">Search</button>
				  </div>
				</form>

		    {isLoading ? (<span>Loading...</span>) : <span></span>}

				<div className="songsContainer">
					<ul>
						{songs.map((song, i) =>
							<li key={i}> 
								<a href={song.trackViewUrl}>{song.trackCensoredName}</a>
							</li>
						)}
					</ul>
				</div>
			</div>
    );
  }
}

export default Search;