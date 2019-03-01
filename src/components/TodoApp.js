import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import { saveTodoItem } from "../lib/service";


export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTodo: '',
      todos: []
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.addTodoToList = this.addTodoToList.bind(this);
  }

  updateInputValue(e) {
    this.setState({currentTodo: e.target.value});
  };

  addTodoToList(e) {
    e.preventDefault();
    const newTodoItem = {
      name: this.state.currentTodo,
      isCompleted: false
    };
    saveTodoItem(newTodoItem)
      .then(({data}) => this.setState({
        todos: [...this.state.todos, data],
        currentTodo: ''
      }))
      .catch(() => this.setState(({error: true})))
  }

  render () {
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            { this.state.error ? <div className='error'>Server Error</div> : '' }
            <TodoForm
              currentTodo = { this.state.currentTodo }
              updateInputValue = { this.updateInputValue }
              addTodoToList = { this.addTodoToList }
            />
          </header>
          <section className="main">
            <TodoList todos={this.state.todos} />
          </section>
          <Footer />
        </div>
      </Router>
    )
  }
}
