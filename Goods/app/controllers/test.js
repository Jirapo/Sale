var mongoose = require('mongoose')
var User = mongoose.model('User')
var Category = mongoose.model('Category')
var District = mongoose.model('District')
var Message = mongoose.model('Message')
var Recency = mongoose.model('Recency')
var Perchase = mongoose.model('Perchase')
var Goods = mongoose.model('Goods')

var async = require('async')
var fs = require('fs')
var path = require('path')

exports.test = function(req,res){
	// var id ="547f2802cbfc53ec0ed02713"
	// Goods.findById(id , function(err, g){
	// 	Category.findOne({name:"生活用品"})
	// 	.exec(function(err, c){
	// 		c.goods.push(g._id)
	// 		c.save()
	// 	})
	// })
	
}




