const path = require('path')
const { promisify } = require('util')
const fs = require('fs')
const fetch = require('node-fetch')
const config = require('./config')

const acceptedFormats = config.acceptedFormats
const musicStorageDir = config.musicStorageDir

module.exports.getHomeCb = function (req, res) {
  fetch(config.elasticUrl + '/metadata/_search')
    .then(res => res.json())
    .then(data => {
      let dataArr = data.hits.hits
      dataArr = dataArr.map(x => x._source)
      res.render('home', { metadata: dataArr })
    })
    .catch(e => { throw e })
}
module.exports.postMusicCb = function (req, res) {
  fetch(config.elasticUrl + '/metadata/my_type', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.fileDetailsObj)
  })
    .then(() => new Promise(resolve => setTimeout(() => resolve(), 2000))) // wait for 2 seconds before redirect as POST data takes time to index into elastic DB (It isn't actually supposed to be used as DB)
    .then(() => res.status(200).redirect('/'))
    .catch(() => {
    // delete file from FS
      fs.unlink(req.fileDetailsObj.path, (e) => { if (e) console.log(e) })
      res.json(`Failed to create metadata for ${req.fileDetailsObj.originalName}`)
        .status(500)
        .send()
    })
}

// middleware
module.exports.fileDetails = function (req, res, next) {
  if (req.file) {
    const fileExt = findFileExt(path.join(musicStorageDir, req.file.filename))

    if (fileExt && acceptedFormats.includes(fileExt.ext)) {
      const fsRename = promisify(fs.rename)
      const {ext, mime} = fileExt
      const newPath = path.join(musicStorageDir, `${req.file.filename}.${ext}`)
      fsRename(req.file.path, newPath)
        .then(() => {
          req.fileDetailsObj = {
            fileName: req.file.filename + '.' + ext,
            originalName: req.file.originalname,
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

// functions
function findFileExt (file) { // determines file extension from first 4100 bytes of data
  const readChunk = require('read-chunk')
  const fileType = require('file-type')
  const buffer = readChunk.sync(file, 0, 4100)
  return fileType(buffer)
}
