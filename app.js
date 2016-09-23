'use strict'

const form = document.querySelector('form')
const list = document.querySelector('.list')
var allTodos = []

const renderTodo = (text, done) => {
  const el = document.createElement('div')
  const p = document.createElement('p')
  const span = document.createElement('span')
  p.textContent = text
  span.textContent = 'X'
  el.classList.add('todo')
  p.classList.add('todo-text')
  if (done) p.classList.add('done')
  el.appendChild(p)
  el.appendChild(span)
  list.appendChild(el)
}

const createTodo = (text, done) => ({
  text: text,
  done: done
})

const addTodo = (e) => {
  e.preventDefault()
  const td = e.target.todo.value
  storeTodo(td)
  renderTodo(td, false)
  e.target.todo.value = ''
}

const storeTodo = (text) => {
  const newItem = createTodo(text, false)
  allTodos.push(newItem)
  localStorage.setItem('todos', JSON.stringify(allTodos))
}

const deleteTodo = (target) => {
  const text = target.previousSibling.textContent

  allTodos = allTodos.filter(t => t.text !== text)
  localStorage.setItem('todos', JSON.stringify(allTodos))
  list.innerHTML = ''
  renderExisting(allTodos)
}

const renderExisting = (todos) => {
  todos.forEach(todo => renderTodo(todo.text, todo.done))
}

const toggleDone = (target) => {
  target.classList.toggle('done')
  for (let todo of allTodos) {
    if (todo.text === target.innerText) {
      todo.done = !todo.done
      localStorage.setItem('todos', JSON.stringify(allTodos))
      return
    }
  }
}

const dispatchEvent = (e) => {
  if (e.target.matches('p')) {
    toggleDone(e.target)
  } else if (e.target.matches('span')) {
    console.log('span');
    deleteTodo(e.target)
  } else {
    return
  }
}

window.onload = () => {
  allTodos = localStorage.todos
    ? JSON.parse(localStorage.getItem('todos'))
    : []
  renderExisting(allTodos)
  form.addEventListener('submit', addTodo)
  list.addEventListener('click', dispatchEvent)
}
