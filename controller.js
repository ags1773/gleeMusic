const path = require('path')
const { promisify } = require('util')
const fs = require('fs')
const config = require('./config')

const acceptedFormats = config.acceptedFormats
const musicStorageDir = config.musicStorageDir

module.exports.postReqCallback = function (req, res) {
  let temp = req.fileDetailsObj

  // create metadata about music file
  // write metadata to DB
  for (let prop in temp) {
    console.log(`${prop}: ${temp[prop]}`)
  }
  res.json(temp).status(200).send()
}

// middleware
module.exports.fileDetails = function (req, res, next) {
  if (req.file) {
    // const fileExt = findFileExt(path.join(musicStorageDir, req.file.filename))
    const fileExt = findFileExt(path.join(musicStorageDir, req.file.filename))

    if (fileExt && acceptedFormats.includes(fileExt.ext)) {
      const fsRename = promisify(fs.rename)
      const {ext, mime} = fileExt
      const newPath = path.join(musicStorageDir, `${req.file.filename}.${ext}`)
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
      fsUnlink(path.join(musicStorageDir, req.file.filename))
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

function findFileExt (file) {
  const readChunk = require('read-chunk')
  const fileType = require('file-type')
  const buffer = readChunk.sync(file, 0, 4100)
  return fileType(buffer) // calculates filetype from first 4100 bytes of buffer data
}
