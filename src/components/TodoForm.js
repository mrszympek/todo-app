import React from 'react'

export default props =>
  <form>
    <input
      type='text'
      autoFocus
      className="new-todo"
      placeholder="What needs to be done?"
      value={ props.currentTodo }
      onChange={ props.updateInputValue }
    />
  </form>
