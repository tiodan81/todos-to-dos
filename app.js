'use strict'

const form = document.querySelector('form')
const list = document.querySelector('.list')
var todos = []

const addElWithText = (type, text, parent) => {
  const el = document.createElement(type)
  el.textContent = text
  parent.appendChild(el)
}

const addTodo = (e) => {
  e.preventDefault()
  const text = e.target.todo.value
  storeTodo(text)
  addElWithText('li', text, list)
  e.target.todo.value = ''
}

const storeTodo = (text) => {
  todos.push(text)
  localStorage.setItem('todos', JSON.stringify(todos))
}

const renderExisting = (tds) => {
  tds.forEach(todo => addElWithText('li', todo, list))
}

const toggleDone = (e) => {
  e.target.classList.toggle('done')
}

window.onload = () => {
  console.log(todos);
  todos = localStorage.todos
    ? JSON.parse(localStorage.getItem('todos'))
    : []
  renderExisting(todos)
  form.addEventListener('submit', addTodo)
  list.addEventListener('click', toggleDone)
}
