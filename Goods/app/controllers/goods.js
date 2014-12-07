var mongoose = require('mongoose')
var User = mongoose.model('User')
var Category = mongoose.model('Category')
var District = mongoose.model('District')
var Recency = mongoose.model('Recency')
var Perchase = mongoose.model('Perchase')
var Goods = mongoose.model('Goods')


var _ = require('underscore')
var async = require('async')
var fs = require('fs')
var path = require('path')


exports.saveImg = function(req,res,next){
	var i 
	, inst = req.files.img
	, imgs = []
	, productObj = req.body.product

	if (productObj.pid) {
		
		next()
	}else{

		req.imgs = []

		if (inst.constructor === Array) {
			imgs = inst
		}else{
			imgs.push(inst)
		}

		async.each(imgs, function( img, callback) {

			var filePath = img.path
			var originalname = img.originalname

			fs.readFile(filePath, function(err, data) {
				//var timestamp = Date.now()
				//var type = img.extension
				//var poster = originalname + timestamp + '.' + type
				var poster = img.name
				var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)

				fs.writeFile(newPath, data, function(err) {
					req.imgs.push(poster)
					callback()
				})
			})
		}, function(err){
			if( err ) {
				console.log(err);
			} else {
				next()
			}
		})
	}
}

exports.saveGoods = function(req,res){
	
	var user = req.session.user
	, productObj = req.body.product
	, id 

	productObj.owner = user._id
	id = productObj.pid

	if(req.imgs){
		productObj.pic = req.imgs
	}

	if (id) {

		Goods.findById(id, function(err, product){
			if (err) {
		       console.log(err)
		    }

		    _product = _.extend(product, productObj)
		    _product.save(function(err, goods){
		    	if (err) {
			       console.log(err)
			    }
			    if ( productObj.onsale !== undefined) {

			    	return res.send({
			        product: goods
			      })

			    }else{
			    	res.redirect('/goods/' + id)
			    }
			    
		    })
		})

	}else{

		var product = new Goods(productObj)
		product.save(function(err, product) {
			if (err) {
				console.log(err)
			}

			User.findById(user._id, function(err, user){
				if (err) {
					console.log(err)
				}

				user.goods.push(product._id)
				user.save(function(err, user){
					if (err) {
						console.log(err)
					}
					
					Category.findById(product.category, function(err, category){
						if (err) {
							console.log(err)
						}

						category.goods.push(product._id)
						category.save(function(err, user){
							if (err) {
								console.log(err)
							}
							
							res.redirect('/')
						})
					})
				})
			})
		}) 
	}
}

exports.detail = function(req,res){

  Goods.findOne({_id: req.params.id})
	.populate('owner')
	.populate('recency category')
	.exec(function(err, product){

		/*var opts = {
			path: 'owner.districtId'
		}

		Goods.populate(product, opts, function(err, goods) {

			console.log(product)
			return res.render('detail', {
	        user: req.session.user ,
	        categories: req.session.categories ,
	        product: goods
	      })
		})*/
		District.findOne({_id: product.owner.districtId})
		.exec(function(err, district){
			return res.render('detail', {
	        user: req.session.user ,
	        categories: req.session.categories ,
	        product: product,
	        district: district
	      })
		})
   })
}


