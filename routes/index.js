const express = require('express')
const router = express.Router()//引入express內建的Router模組

//引入home模組 & 導向home模組
const home = require('./modules/home.js')
router.use('/', home)

//引入todos模組 & 導向todos模組
const todos = require('./modules/todos.js')
router.use('/todos', todos)

module.exports = router