const express = require('express')
const router = express.Router()
const config = require('./config')
const multer = require('multer')
const { fileDetails, postReqCallback } = require('./controller')

const upload = multer({dest: config.musicStorageDir})

router.post('/music', upload.single('song'), fileDetails, postReqCallback)

module.exports = router
