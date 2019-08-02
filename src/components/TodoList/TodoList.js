import React, { Component } from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';
import './TodoList.css'

export default class TodoList extends Component {
  render() {
    return (
      <ul className='list-group  todo-list'>
        {this.props.todos.map(item => {
         return (
          <li className='list-group-item' key={item.id}>
            <TodoListItem 
              {... item} 
              onDeleted={() => this.props.onDeleted(item.id)}
              onToggleImportant={() => this.props.onToggleImportant(item.id)}
              onToggleDone={() => this.props.onToggleDone(item.id)}/>
          </li> )
        })}
      </ul>
    )
  }
}
