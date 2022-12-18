const mongoose = require('mongoose')

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

module.exports = db