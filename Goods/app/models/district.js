var mongoose = require('mongoose')
var DistrictSchema = require('../schemas/district')
var District = mongoose.model('District', DistrictSchema)

module.exports = District