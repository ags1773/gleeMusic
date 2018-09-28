const express = require('express')
const router = express.Router()
const config = require('./config')
const multer = require('multer')
const { fileDetails, postMusicCb, getHomeCb, getFormCb } = require('./controller')

const upload = multer({dest: config.musicStorageDir})

router.get('/', getHomeCb)
router.get('/music', getFormCb)
router.post('/music', upload.single('song'), fileDetails, postMusicCb)

module.exports = router
