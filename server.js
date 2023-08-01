require('module-alias/register')

const morgan = require('morgan')
const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions = require('@configs/corsOptions.config')

require('dotenv').config()

const port = process.env.PORT || 3000
//app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hie')
})

app.listen(port, () => {
  console.log(`Server is now running on port ${port}`)
})