module.exports.findFileExt = function (file) {
  const readChunk = require('read-chunk')
  const fileType = require('file-type')
  const buffer = readChunk.sync(file, 0, 4100)
  return fileType(buffer) // calculates filetype from first 4100 bytes of buffer data
}
