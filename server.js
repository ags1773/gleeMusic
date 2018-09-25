const express = require('express')
const path = require('path')
const multer = require('multer')
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
  let fileExt = findFileExt(path.join(__dirname, '/music/', req.file.filename))
  if (fileExt) {
    let {ext, mime} = fileExt
    req.fileDetailsObj = {
      name: req.file.encoding,
      filename: req.file.filename,
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
  }
  res.status(400).send()
}

module.exports = app
