import React, { Component } from 'react';
import Searchbar from 'material-ui-search-bar';
import Script from 'react-load-script';
const GOOGLE_PLACE_API_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      query: '',
    };
  }

  handleScriptLoad = () => {
    const options = { types: ['(cities)'] };
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options
    );

    this.autocomplete.setFields(['address_components', 'formatted_address']);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    const addressObject = this.autocomplete.getPlace();
    const { formatted_address } = addressObject;

    this.setState({
      location: formatted_address,
      query: formatted_address,
    });
  };

  render() {
    return (
      <div>
        <Script url={GOOGLE_PLACE_API_URL} onLoad={this.handleScriptLoad} />
        <Searchbar
          id="autocomplete"
          placeholder="Enter city..."
          value={this.state.query}
          style={{
            margin: '0 auto',
            maxWidth: 800,
          }}
        />
      </div>
    );
  }
}

export default Search;
