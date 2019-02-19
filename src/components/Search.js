import React from 'react';
import axios from 'axios';
import moment from 'moment';
import jsonpAdapter from 'axios-jsonp';

// API URL.
const API = "https://itunes.apple.com/search?term=";

// Regex to match alpha numeric characters and spaces. 
const artistRegex = /^[a-zA-Z0-9 ]*$/;

// Regex to verify MM/DD/YYYY format.
const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

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
		e.preventDefault();
		const { formErrors, artist } = this.state;

    if (formValid(formErrors)) {
			this.setState({
				error: '',
				startDate: '',
				endDate: ''
			});
			this.handleSearch(artist);
    } else {
      this.setState({
				error: 'Artist name field can only contain alpha numeric characters and spaces. Date must be in MM/DD/YYYY format. Please try again.',
			  startDate: '',
				endDate: ''
			});
    }
  };

  // Function to handle input change.
  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
	
    switch (name) {
      case 'artist':
        formErrors.artist = artistRegex.test(value) ? '' : 'Artist name field can only contain alpha numeric characters and spaces, sorry AC/DC fans.';
				break;
			case 'startDate':
				formErrors.startDate = dateRegex.test(value) ? ''  : 'Date must be in MM/DD/YYYY format';
			case 'endDate': 
				formErrors.endDate = dateRegex.test(value) ? '' : 'Date must be in MM/DD/YYYY format';
      default:
        break;
    }

		// This
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
	};

  render() {
    const { formErrors, songs, isLoading, startDate, endDate, error } = this.state;

    return (
			<div className="page-wrapper">
				<form onSubmit={this.handleSubmit}>
				  <input 
					id="artist"
					type="text"
					placeholder="Artist" 
					name="artist"
					onChange={this.handleChange}
					/>
					
					<input 
					id="startDate"
					type="text"
					placeholder="Start Date"  
					name="startDate"
					onChange={this.handleChange}
					/>
						
					<input 
					id="endDate"
					type="text"
					placeholder="End Date"  
					name="endDate"
					onChange={this.handleChange}
					/>

					<button type="submit">Search</button>

					<div className="error-alert">
						{formErrors.artist.length > 0 ? (<p className="error-message">{formErrors.artist}</p>) : (<span></span>)}
						{/* {formErrors.startDate.length > 0 ? (<p className="error-message">{formErrors.startDate}</p>) : (<span></span>)} */}
						{/* {formErrors.endDate.length > 0 ? (<p className="error-message">{formErrors.endDate}</p>) : (<span></span>)} */}
						{error !== '' ? <p className="error-message">{error}</p> : <span></span>}
					</div>
				</form>

		    {isLoading ? (<span>Loading...</span>) : <span></span>}

				<div className="songsContainer">
					{startDate !== '' && endDate !== '' 
					?
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
					: 
					<ul>
					{songs.map((song, i) =>
						<li key={i}>
								<a href={song.trackViewUrl}>{song.trackCensoredName}</a>
								<img src={song.artworkUrl100} />
							</li>
					
					  )}
					 </ul>
					}
				</div>
			</div>
    );
  }
}

export default Search;