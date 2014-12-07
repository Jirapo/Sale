var mongoose = require('mongoose')
var User = mongoose.model('User')
var Category = mongoose.model('Category')
var District = mongoose.model('District')
var Message = mongoose.model('Message')
var Recency = mongoose.model('Recency')
var Perchase = mongoose.model('Perchase')

var _ = require('underscore')



// index page
exports.index = function(req,res){

	Message
	.find({})
	.exec(function(err, messages){
		req.session.messages = messages

		Category
		.find({})
		.exec(function(err, categories){
			req.session.categories = categories

			District
			.find({})
			.exec(function(err, districts){
				req.session.districts = districts

				Recency
				.find({})
				.exec(function(err, recencies){
					req.session.recencies = recencies

					Perchase
					.find({})
					.exec(function(err, perchases){
						res.render('admin', {
							categories: categories,
							districts: districts,
							messages: messages,
							recencies: recencies,
							perchases: perchases
					   })
					})
				})
			})
		})
	})
}

exports.saveDistrict = function(req,res){
	var districtObj = req.body.district
	var id = districtObj.did

	if (id) {
		District.findById(id, function(err, district){
			if (err) {
		       console.log(err)
		    }

		    _district = _.extend(district, districtObj)
		    _district.save(function(err, district){
		    	if (err) {
			       console.log(err)
			    }
			    res.redirect('/admin')
		    })
		})

	}else{
		var district = new District(districtObj)

		district.save(function(err, district) {
			if (err) {
				console.log(err)
			}

			res.redirect('/admin')
		}) 
	}
}
exports.delDistrict = function(req,res){
	var id = req.query.id

	if (id) {
		District.remove({_id: id}, function(err, district) {
			if (err) {
				console.log(err)
				// res.json({success: 0})
			}
			res.redirect('/admin')
			// else {
			// 	res.json({success: 1})
			// }
		})
	}
}

exports.saveRecency = function(req,res){
	var recencyObj = req.body.recency
	var id = recencyObj.rid

	if (id) {
		Recency.findById(id, function(err, recency){
			if (err) {
		       console.log(err)
		    }

		    _recency = _.extend(recency, recencyObj)
		    _recency.save(function(err, recency){
		    	if (err) {
			       console.log(err)
			    }
			    res.redirect('/admin')
		    })
		})
	}else{
		var recency = new Recency(recencyObj)

		recency.save(function(err, recency) {
			if (err) {
				console.log(err)
			}

			res.redirect('/admin')
		}) 
	}
}
exports.delRecency = function(req,res){
	var id = req.query.id

	if (id) {
		Recency.remove({_id: id}, function(err, recency) {
			if (err) {
				console.log(err)
			}
			res.redirect('/admin')
			
		})
	}
}

exports.saveCategory = function(req,res){
	var categoryObj = req.body.category
	var id = categoryObj.cid

	if (id) {
		Category.findById(id, function(err, category){
			if (err) {
		       console.log(err)
		    }

		    _category = _.extend(category, categoryObj)
		    _category.save(function(err, category){
		    	if (err) {
			       console.log(err)
			    }
			    res.redirect('/admin')
		    })
		})

	}else{
		var category = new Category(categoryObj)

		category.save(function(err, category) {
			if (err) {
				console.log(err)
			}

			res.redirect('/admin')
		}) 
	}
}
exports.delCategory = function(req,res){
	var id = req.query.id

	if (id) {
		Category.remove({_id: id}, function(err, category) {
			if (err) {
				console.log(err)
			}
			res.redirect('/admin')
			
		})
	}
}

exports.saveMessage = function(req,res){

	var messageObj = req.body.message
	var id = messageObj.mid

	if (id) {
		Message.findById(id, function(err, message){
			if (err) {
		       console.log(err)
		    }

		    _message = _.extend(message, messageObj)
		    _message.save(function(err, message){
		    	if (err) {
			       console.log(err)
			    }
			    res.redirect('/admin')
		    })
		})

	}else{
		var message = new Message(messageObj)

		message.save(function(err, message) {
			if (err) {
				console.log(err)
			}

			res.redirect('/admin')
		}) 
	}
}
exports.delMessage = function(req,res){

	var id = req.query.id

	if (id) {
		Message.remove({_id: id}, function(err, message) {
			if (err) {
				console.log(err)
			}
			res.redirect('/admin')
		})
	}
}

exports.delPerchase = function(req,res){
	var id = req.query.id

	if (id) {
		Perchase.remove({_id: id}, function(err, perchase) {
			if (err) {
				console.log(err)
			}
			res.redirect('/admin')
			
		})
	}
}


