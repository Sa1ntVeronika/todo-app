import React, { Component } from 'react';

import './AddItemForm.css'

export default class AddItemForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       label: ''
    }
  }
  

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.label);
    this.setState({
      label: ''
    })
  }

  render() {
    return (
      <form className='item-add-form d-flex'
            onSubmit={this.onSubmit}>
        <input type='text'
               className='form-control'
               onChange={this.onLabelChange} 
               placeholder='What do you want to do?'
               value={this.state.label}/>
        <button className='btn btn-outline-secondary'>Add Item</button>
      </form>
    )
  }
}
