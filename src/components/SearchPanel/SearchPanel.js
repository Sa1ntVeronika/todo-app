import React, { Component } from 'react'

export default class SearchPanel extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       term: ''
    }
  }
  
  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  }
  render() {
    return (
      <div>
        <input type='text' 
                      className='form-control search-input'
                      placeholder='search'
                      value={this.state.term}
                      onChange={this.onSearchChange}/>  
      </div>
    )
  }
}
