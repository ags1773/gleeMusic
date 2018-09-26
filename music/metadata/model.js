const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const dataSchema = new Schema({
  _id: ObjectId,
  fileName: String,
  originalName: String,
  path: String,
  size: Number,
  encoding: String,
  mimeType: String
})

module.exports = mongoose.model('Metadata', dataSchema)