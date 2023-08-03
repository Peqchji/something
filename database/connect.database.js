require('dotenv').config()
const dbConfig = require('@configs/database.config')
const mongoose = require('mongoose')

const connect = async function() {
  try {
    await mongoose.connect(process.env.DB_URI, dbConfig)
    console.log("Connect database successfully")
  }
  catch(error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connect