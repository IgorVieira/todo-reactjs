import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import {
         addTodo, generateId,
         findById, toggleTodo,
         updateTodo, removeTodo,
         filterTodos
       } from './lib/todoHelpers.js';
import {pipe, partial} from './lib/utils'
import {loadTodos} from './lib/todoService'
class App extends Component {
  
  state = {
    todos:[],
    currentTodo: ''
  }


  static contextTypes = {
    route: PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}))
  }

  handleRemove = (id, evt) => {
    evt.preventDefault()

    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({todos:updatedTodos})
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value
    })
  }

  handleToggle = (id) => {
    const getUpdateTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updateTodos = getUpdateTodos
    this.setState({todos:updateTodos})
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    const newId = generateId()
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}
    const updateTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updateTodos,
      currentTodo: '',
      errorMessage: ''
    })
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault()

    this.setState({
      errorMessage: 'Please type anything'
    })
  }


  render() {
    
    const submitHandler = this.state.currentTodo ?
                          this.handleSubmit:
                          this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className="error">
            {this.state.errorMessage}  
          </span>}
          <TodoForm handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}/>          

          <TodoList handleToggle={this.handleToggle} 
              todos={displayTodos}
              handleRemove={this.handleRemove}/>
          <Footer />
        </div>


      </div>
    );
  }
}

export default App;
