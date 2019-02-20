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
			loadError: '',
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
		
		console.log(API + query.split(' ').join('+'));

    axios.get(API + query.split(' ').join('+'), { adapter: jsonpAdapter })
			.then(res => 
        this.setState({
				 songs: res.data.results,
				 loadError: res.data.results.length,
				 isLoading: false,
				 error: ''
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
		const { artist, startDate, endDate } = e.target;
		const { formErrors } = this.state;

		if (artist.value.length === 0) { 
			formErrors.artist = 'Arist name field is required.';
		} else { 
			formErrors.artist = artistRegex.test(artist.value) ? '' : 'Artist name field can only contain alpha numeric characters and spaces, sorry AC/DC fans.';
		}

		if (startDate.value.length > 0) {
			formErrors.startDate = dateRegex.test(startDate.value) ? ''  : 'Date must be in MM/DD/YYYY format';
		} 

		if (endDate.value.length > 0) {
			formErrors.endDate = dateRegex.test(endDate.value) ? ''  : 'Date must be in MM/DD/YYYY format';
		}

		this.setState({
			formErrors: { 
				artist: formErrors.artist,
				startDate: formErrors.startDate,
				endDate: formErrors.endDate
			}
		})

    if (formValid(formErrors)) {
			this.setState({ 
				startDate: startDate.value,
				endDate: endDate.value,
				error: ''
			})
			this.handleSearch(this.state.artist);
    } else {
      this.setState({
				error: 'Artist name field is required and can only contain alpha numeric characters and spaces. Date must be in MM/DD/YYYY format. Please try again.',
			  startDate: '',
				endDate: '',
				formErrors: { 
					startDate: '', 
					endDate: ''
				}
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
      default:
        break;
		}
		
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
	};

  render() {
    const { songs, isLoading, startDate, endDate, error, loadError } = this.state;

    return (
			<div className="page-wrapper">
				<form onSubmit={this.handleSubmit}>
          <p>Enter your favorite artist!</p>
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
					/>
						
					<input 
					id="endDate"
					type="text"
					placeholder="End Date"  
					name="endDate"
					/>

					<button type="submit">Search</button>

					<div className="error-alert">
					  {error !== '' ? <p className="error-message">{error}</p> : <span></span>}
					</div>
				</form>

				{isLoading ? (<span>Loading...</span>) : <span></span>}
				{loadError === 0 ? <p className="error-message">{`We didn't find anything :/`}</p> : <span></span>}

				<div className="songsContainer">
					{ (startDate !== '' && endDate !== '') 
					?
					<ul>
						{songs.map((song, i) =>
							moment(new Date(this.state.endDate)).toISOString() > song.releaseDate && song.releaseDate > moment(new Date(this.state.startDate)).toISOString()
							? <li key={i}>
							    <img src={song.artworkUrl100} />
								  <a href={song.trackViewUrl}><p>{song.trackCensoredName}</p></a>
									<p>{moment(song.releaseDate).format('MM/DD/YYYY')}</p>
								</li>
							: ''
						)}
					</ul>
					:
					<ul>
					{songs.map((song, i) =>
						<li key={i}>
							<img src={song.artworkUrl100} />
							<a href={song.trackViewUrl}><p className="trackCensoredName">{song.trackCensoredName}</p></a>
							<p>{moment(song.releaseDate).format('MM/DD/YYYY')}</p>
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