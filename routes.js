const express = require('express')
const router = express.Router()
const config = require('./config')
const multer = require('multer')
const { fileDetails, postReqCallback } = require('./controller')

const upload = multer({dest: config.musicStorageDir})

router.post('/music', upload.single('song'), fileDetails, postReqCallback)
router.get('/', (req, res) => {
  // get all documents from db
  // send them to template
  res.render('home', {test: 'abc123'})
})

module.exports = router
