import React, { Component } from 'react';
import TodoList from './components/TodoList/TodoList';
import AppHeader from './components/AppHeader/AppHeader';
import SearchPanel from './components/SearchPanel/SearchPanel';
import ItemFilter from './components/ItemFilter/ItemFilter';
import AddItemForm from './components/AddItemForm/AddItemForm'

import './App.css';

export default class App extends Component {

  maxId = 100;

  constructor(props) {
    super(props)
  
    this.state = {
      todoData: [
        { label: 'Watch Football', important: false, done: false, id: 1 },
        { label: 'Play guitar', important: false, done: false, id: 2 },
        { label: 'Have a Lunch', important: false, done: false, id: 3 },
      ],
      term: '',
      filter: 'all' //active
    }
  }

  
  deleteItem = (id) => {
    this.setState((state) => {
      const idx = state.todoData.findIndex((el) => el.id === id);
      const newData = [...state.todoData.slice(0, idx), ...state.todoData.slice(idx + 1)];

      return {
        todoData: newData
      }
    })
  }

  addItem = (text) => {
    const newItem = {
      label: text,
      important: false,
      done: false,
      id: this.maxId++,
    }

    this.setState((state) => {
      const newTodo = [
        ...state.todoData,
        newItem
      ];

      return {
        todoData: newTodo
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName]};

    return [ ...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id) => {
    this.setState((state) => {
      return {
        todoData: this.toggleProperty(state.todoData, id, 'important'),
      }
    })
  }

  onToggleDone = (id) => {
    this.setState((state) => {
      return {
        todoData: this.toggleProperty(state.todoData, id, 'done'),
      }
    })
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  search(items, term) {
    if (term.length === 0) {
      return items
    }
    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
       case 'active':
         return items.filter(item => !item.done);
       case 'done':
         return items.filter(item => item.done);
       default:
         return items;
    }
  }
  
  render() {

    const doneCount = this.state.todoData.filter(el => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    const visibleItems = this.filter(
      this.search(this.state.todoData, this.state.term),
      this.state.filter)

    return (
      <div className='todo-app'>
        <AppHeader toDo = {todoCount} done={doneCount}/>
        <div className='top-panel d-flex'>
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemFilter filter={this.state.filter} onFilterChange={this.onFilterChange}/>
        </div>

        <TodoList
          todos = {visibleItems} 
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />

        <AddItemForm onAdd={this.addItem}/>
      </div>
    )
  }
}
