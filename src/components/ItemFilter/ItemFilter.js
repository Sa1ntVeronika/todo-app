import React, { Component } from 'react'
import './ItemFilter.css';

export default class ItemFilter extends Component {

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ]

  
  render() {

    const buttonsRender = this.buttons.map(( {name, label}) => {
      const isActive = this.props.filter === name;
      const buttonClass = isActive ? 'btn-info' : 'btn-outline-secondary'

      return <button type='button' 
                     className={`btn ${buttonClass}`} 
                     key={name}
                     onClick={() => this.props.onFilterChange(name)}>{label}
             </button>
    })
    return (
      <div className='btn-group'>
        {buttonsRender}
      </div>
    )
  }
}
