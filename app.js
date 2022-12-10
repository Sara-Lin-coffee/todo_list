const express = require('express')
const mongoose = require('mongoose')

//僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000

//MONGODB_URI是環境變數,要連線時需在terminal設定環境變數
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(`${ port }`, () => {
  console.log('====================')
  console.log(`Express is running on http://localhost:${port}`)
})

