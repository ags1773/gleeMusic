const express = require('express')
const router = express.Router()
const config = require('./config')
const multer = require('multer')
const { fileDetails, postMusicCb, getHomeCb } = require('./controller')

const upload = multer({dest: config.musicStorageDir})

router.post('/music', upload.single('song'), fileDetails, postMusicCb)
router.get('/', getHomeCb)

module.exports = router
