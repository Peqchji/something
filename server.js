require('module-alias/register')

require('dotenv').config()
const port = process.env.port

const express = require('express')
const app = express()
const cors = require('cors')
//const morgan = require('morgan')
//const compression = require('compression')

// Database
const corsOptions = require('@configs/corsOptions.config')
const dbConnect = require('./database/connect.database')
dbConnect()

// Middlewares
const errorHandler = require('@middlewares/errorHandler.middleware')
//app.use(morgan('dev'))
//app.use(compression)
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ limit: "1mb", extended: true }))


// Route
const {
  authRoute,
  signUpRoute
} = require('@routes')
app.get('/', function(req, res) {
  res.send('what')
})
app.use('/', signUpRoute)

app.use(errorHandler)

app.listen(port, function(req, res) {
  console.log(`Server is running on port ${port}`)
})