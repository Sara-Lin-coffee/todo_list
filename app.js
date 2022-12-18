const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const routes = require('./routes')

const app = express()
const port = 3000

app.engine('hbs',exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

require('./config/mongoose.js')

//web app監聽器
app.listen(`${ port }`, () => {
  console.log('=====================')
  console.log(`Express is running on http://localhost:${port}`)
})

