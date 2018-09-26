const express = require('express')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const acceptedFormats = ['mp3', 'flac', 'wav', 'm4a', 'aac']
const { findFileExt } = require(path.join(__dirname, '/findFileExt'))
const upload = multer({dest: path.join(__dirname, '/music')})
const app = express()

app.use(express.static(path.join(__dirname, '/music')))

app.post('/music', upload.single('song'), fileDetails, (req, res) => {
  let temp = req.fileDetailsObj
  for (let prop in temp) {
    console.log(`${prop}: ${temp[prop]}`)
  }
  res.json(temp).status(200).send()
})

function fileDetails (req, res, next) {
  if (req.file) {
    const fileExt = findFileExt(path.join(__dirname, '/music/', req.file.filename))

    if (fileExt && acceptedFormats.includes(fileExt.ext)) {
      let {ext, mime} = fileExt
      req.fileDetailsObj = {
        filename: req.file.filename,
        name: req.file.encoding,
        mimetype: req.file.mimetype,
        originalname: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        encoding: req.file.encoding,
        destination: req.file.destination,
        ext: ext,
        mime: mime
      }
      next()
    } else {
      console.log('Delete file >>', path.join(__dirname, '/music/', req.file.filename))
      fs.unlink(path.join(__dirname, '/music/', req.file.filename), err => { if (err) throw err })
      res.status(400).json(`Bad request. Supported formats: ${acceptedFormats}`).send()
    }
  } else res.status(400).json(`Bad request. File not recieved`).send()
}

module.exports = app
