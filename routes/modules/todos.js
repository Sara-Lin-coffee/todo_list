const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo.js')

//呼叫 "/todos/new" 時
router.get('/new', (req, res) => {
  return res.render('new')
})

//接住create資料，並新增至資料課
router.post('/', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.error('error'))
})

//呼叫detail資訊
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.error('error'))
})

//呼叫edit頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.error('error'))
})

//edit_修改資料庫資料
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log('error'))
})

//delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => {
      return todo.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log('error'))
})

module.exports = router