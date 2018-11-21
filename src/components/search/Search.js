import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

import ImageResults from '../image-results/ImageResults';

class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api',
        images: []
    };

    //names and values correspond to TextField below
    onTextChange = (e) => {
        const val = e.target.value;
        this.setState({[e.target.name]: val}, () => {  // see TextField name below
            if (val === '') {
                this.setState({images: []});
            } else {
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&
                image_type=photo&per_page=${this.state.amount}&safesearch=true`) // see pixabay API documentation for API call terms 
                    .then(res => this.setState({images: res.data.hits})) // the response data is on "hits" object in the API response (see API docu)
                    .catch(err => console.log(err));
            }
        });
    };

    // this corresponds to the SelectField below
    onAmountChange = (e, index, value) => this.setState({amount: value});

  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField 
          name="searchText" // name here needs to match the initial state name up top
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />
        <br/>

        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br/>
        {/* if the length of the images array is greater than 0, then show the ImageResultsComponent with images prop passed, else null */}
        {this.state.images.length > 0 ? (<ImageResults images={this.state.images}/>) : null}

      </div>
    )
  }
}

export default Search;