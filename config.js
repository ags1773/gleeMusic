const path = require('path')

module.exports = {
  musicStorageDir: path.join(__dirname, 'music', 'data'),
  acceptedFormats: ['mp3', 'flac', 'wav', 'm4a', 'aac'],
  port: process.env.PORT || 3000,
  elasticUrl: 'http://127.0.0.1:9200'
}
