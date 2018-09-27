const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = new Schema({
  fileName: String,
  originalName: String,
  path: String,
  size: Number,
  encoding: String,
  mimeType: String
})

const Model = mongoose.model('Metadata', dataSchema)
module.exports.model = Model

module.exports.fetchAll = () => Model.find({})
