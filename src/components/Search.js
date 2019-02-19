import React from 'react';
import axios from 'axios';
import moment from 'moment';
import jsonpAdapter from 'axios-jsonp';

// API URL.
const API = "https://itunes.apple.com/search?term=";

// Regex to match alpha numeric characters and spaces. 
const artistRegex = /^[a-zA-Z0-9 ]*$/;

// Regex to verify DD-MM-YYYY format.
const dateRegex = /^\s*(3[01]|[12][0-9]|0?[1-9])\-(1[012]|0?[1-9])\-((?:19|20)\d{2})\s*$/;

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
				songs: '',
				startDate: '',
				endDate: ''
      },
      isLoading: false,
			error: '',
			startDate: '',
			endDate: ''
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
	  console.log(this.state);
		e.preventDefault();
		const { formErrors, artist } = this.state;

    if (formValid(formErrors)) {
      this.handleSearch(artist);
    } else {
      console.error(`Unable to lookup`);
    }
  };

  // Function to handle input change.
  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'artist':
        formErrors.artist = artistRegex.test(value) ? '' : 'Artist name field can only contain alpha numeric characters and spaces, sorry AC/DC fans';
				break;
			case 'startDate':
				formErrors.startDate = dateRegex.test(value) ? ''  : 'Date must be in DD-MM-YYYY format';
			case 'endDate': 
				formErrors.endDate = dateRegex.test(value) ? '' : 'Date must be in DD-MM-YYYY format';
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
						name="artist"
						onChange={this.handleChange}
					  />
					 {formErrors.artist.length > 0 ? (<span>{formErrors.artist}</span>) : (<span></span>)}
					
					<div className="date-range">
					  <input 
						type="text"
						placeholder="Start Date"  
						name="startDate"
						onChange={this.handleChange}
					  />
						{formErrors.startDate.length > 0 ? (<span>{formErrors.startDate}</span>) : (<span></span>)}
						
						<input 
						type="text"
						placeholder="End Date"  
						name="endDate"
						onChange={this.handleChange}
					  />
						{formErrors.endDate.length > 0 ? (<span>{formErrors.endDate}</span>) : (<span></span>)}
					</div>

				  <div className="search-btn">
					  <button type="submit">Search</button>
				  </div>
				</form>

		    {isLoading ? (<span>Loading...</span>) : <span></span>}

				<div className="songsContainer">
					<ul>
						{songs.map((song, i) =>
							moment(new Date(this.state.endDate)).toISOString() > song.releaseDate && song.releaseDate > moment(new Date(this.state.startDate)).toISOString()
							? <li key={i}>
								  <a href={song.trackViewUrl}>{song.trackCensoredName}</a>
									<img src={song.artworkUrl100} />
								</li>
							: ''
						)}
					</ul>
				</div>
			</div>
    );
  }
}

export default Search;