const express = require('express')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const { promisify } = require('util')
const { findFileExt } = require(path.join(__dirname, 'findFileExt'))
const acceptedFormats = ['mp3', 'flac', 'wav', 'm4a', 'aac']
const upload = multer({dest: path.join(__dirname, 'music')})
const app = express()

app.use(express.static(path.join(__dirname, 'music')))

app.post('/music', upload.single('song'), fileDetails, (req, res) => {
  let temp = req.fileDetailsObj
  for (let prop in temp) {
    console.log(`${prop}: ${temp[prop]}`)
  }
  res.json(temp).status(200).send()
})

function fileDetails (req, res, next) {
  if (req.file) {
    const fileExt = findFileExt(path.join(__dirname, 'music', req.file.filename))

    if (fileExt && acceptedFormats.includes(fileExt.ext)) {
      const fsRename = promisify(fs.rename)
      const {ext, mime} = fileExt
      const newPath = path.join(__dirname, 'music', `${req.file.filename}.${ext}`)
      fsRename(req.file.path, newPath)
        .then(() => {
          req.fileDetailsObj = {
            filename: req.file.filename + ext,
            originalname: req.file.originalname,
            path: newPath,
            size: req.file.size,
            encoding: req.file.encoding,
            mimeType: mime
          }
          next()
        })
        .catch(e => { throw e })
    } else {
      const fsUnlink = promisify(fs.unlink)
      fsUnlink(path.join(__dirname, 'music', req.file.filename))
        .then(() => {
          res
            .status(400)
            .json(`File either not of supported format, or unable to verify file format.. Accepted formats: ${acceptedFormats}`)
            .send()
        })
        .catch(e => { throw e })
    }
  } else res.status(400).json(`Bad request. File not recieved`).send()
}

module.exports = app
