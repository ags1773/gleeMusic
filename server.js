const express = require('express')
const mongoose = require('mongoose')
const navRoutes = require('./routes')
const config = require('./config')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/gleeMusic', { useNewUrlParser: true })
app.use(express.static(config.musicStorageDir))
app.use(navRoutes)

module.exports = app
