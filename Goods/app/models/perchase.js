var mongoose = require('mongoose')
var PerchaseSchema = require('../schemas/perchase')
var Perchase = mongoose.model('Perchase', PerchaseSchema)

module.exports = Perchase