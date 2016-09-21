'use strict'

const form = document.querySelector('form')
const list = document.querySelector('.list')
var allTodos = []

const addElWithText = (type, text, done, parent) => {
  const el = document.createElement(type)
  el.textContent = text
  if (done) el.classList.add('done')
  parent.appendChild(el)
}

const createTodo = (text, done) => ({
  text: text,
  done: done
})

const addTodo = (e) => {
  e.preventDefault()
  const td = e.target.todo.value
  storeTodo(td)
  addElWithText('li', td, false, list)
  e.target.todo.value = ''
}

const storeTodo = (text) => {
  const newItem = createTodo(text, false)
  allTodos.push(newItem)
  localStorage.setItem('todos', JSON.stringify(allTodos))
}

const renderExisting = (todos) => {
  todos.forEach(todo => addElWithText('li', todo.text, todo.done, list))
}

const toggleDone = (e) => {
  if (e.target.matches('li')) {
    e.target.classList.toggle('done')
    for (let todo of allTodos) {
      if (todo.text === e.target.innerText) {
        todo.done = !todo.done
        localStorage.setItem('todos', JSON.stringify(allTodos))
        return
      }
    }
  }
}

window.onload = () => {
  allTodos = localStorage.todos
    ? JSON.parse(localStorage.getItem('todos'))
    : []
  renderExisting(allTodos)
  form.addEventListener('submit', addTodo)
  list.addEventListener('click', toggleDone)
}
