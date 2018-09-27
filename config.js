const path = require('path')

module.exports = {
  musicStorageDir: path.join(__dirname, 'music', 'data'),
  acceptedFormats: ['mp3', 'flac', 'wav', 'm4a', 'aac'],
  port: process.env.PORT || 3000,
  mongodbUrl: 'mongodb://127.0.0.1:27017/gleeMusic'
}
