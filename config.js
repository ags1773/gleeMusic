const path = require('path')

module.exports = {
  musicStorageDir: path.join(__dirname, 'music', 'data'),
  acceptedFormats: ['mp3', 'flac', 'wav', 'm4a', 'aac']
}
