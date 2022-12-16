const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Todo = require('./models/todo')

const app = express()
const port = 3000

app.engine('hbs',exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

//僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//MONGODB_URI是環境變數,要連線時需在terminal設定環境變數
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//連接資料庫
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//呼叫"根目錄"
app.get('/', (req, res) => {
  Todo.find()
  .lean()
  .sort({ _id: 'asc'})
  .then(todos => 
    res.render('index', {todos}))
  .catch( error => console.error('error'))
})

//呼叫 "/todos/new" 時
app.get('/todos/new', (req, res) =>{
  return res.render('new')
})

//接住create資料，並新增至資料課
app.post('/todos', (req, res) =>{
  const name = req.body.name
  return Todo.create({ name })
  .then( ()=> res.redirect('/'))
  .catch(error => console.error('error'))
})

//呼叫detail資訊
app.get('/todos/:id', (req, res)=>{
  const id = req.params.id
  return Todo.findById(id)
  .lean()
  .then( todo=> res.render('detail', {todo}))
  .catch( error => console.error('error'))
})

//呼叫edit頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
  .lean()
  .then( (todo)=> res.render('edit', {todo}))
  .catch(error => console.error('error'))
})

//edit_修改資料庫資料
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const {name, isDone} = req.body
  return Todo.findById(id)
    .then( todo => {
      todo.name = name
      todo.isDone = isDone ==='on'
      return todo.save()})
    .then(() => res.redirect(`/todos/${id}`))
    .catch( error => console.log('error'))
})

//delete
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => {
      return todo.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log('error'))
})

//web app監聽器
app.listen(`${ port }`, () => {
  console.log('=====================')
  console.log(`Express is running on http://localhost:${port}`)
})

