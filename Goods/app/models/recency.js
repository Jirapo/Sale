var mongoose = require('mongoose')
var RecencySchema = require('../schemas/recency')
var Recency = mongoose.model('Recency', RecencySchema)

module.exports = Recency