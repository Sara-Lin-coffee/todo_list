//載入mongoose
const mongoose = require('mongoose')

//載入mongoose的Schema架構
const Schema = mongoose.Schema

//每一筆todoSchema都是一筆新的Schema
const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 欄位=必填欄位
  },
  isDone: {
    type: Boolean,
    default: false
  }
})

//匯出模組
module.exports = mongoose.model('Todo', todoSchema)