import axios from 'axios'

export const saveTodoItem = (todo) =>
  axios.post('http://localhost:3030/api/todos', todo);