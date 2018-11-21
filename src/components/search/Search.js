import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api',
        images: []
    };

    //names and values correspond to TextField below
    onTextChange = (e) => {
        this.setState({[e.target.name]: e.target.value}, // see TextField name below
        () => {
            axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}`)
        });
    };

  render() {
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

      </div>
    )
  }
}

export default Search;