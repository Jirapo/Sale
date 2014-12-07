var mongoose = require('mongoose')
var User = mongoose.model('User')


exports.regShow = function(req, res) {
  res.render('register', {
    title: '注册页面'
  })
}

exports.regDeal = function(req, res) {
	var _user = req.body.user
	var repeatPassword = req.body.passwordR

	if (_user.password == repeatPassword && _user.phone) {

		User.findOne({name: _user.name},  function(err, user) {
			if (err) {
				console.log(err)
			}
			
			if (user) {
				return res.redirect('/login')
			}else {
				var user = new User(_user)
				user.save(function(err, user) {
					if (err) {
					  console.log(err)
					}
					req.session.user = user
					//console.log(user)
					res.redirect('/')
				})
			}
		})
	}else{
		res.redirect('/reg')
	}
}

exports.loginShow = function(req, res) {
  res.render('login', {
    title: '登录页面'
  })
}

exports.loginDeal = function(req, res) {
	var _user = req.body.user
	var name = _user.name
	var password = _user.password

	User.findOne({name: name}, function(err, user) {
		if (err) {
		  console.log(err)
		}

		if (!user) {
		  return res.redirect('/reg')
		}

		user.comparePassword(password, function(err, isMatch) {
		  if (err) {
		    console.log(err)
		  }

		  if (isMatch) {
		    req.session.user = user
		    return res.redirect('/')
		  }
		  else {
		    return res.redirect('/login')
		  }
		})
	})
}

// logout
exports.logout =  function(req, res, next) {
	User
  	.findOne({role: 0},function(err, user){
  		if (err) {
  			console.log(err)
  		};
  		req.session.user = user
  		console.log('logout')

  		res.redirect('/')
  	})
}

//adminShow



// midware for user
exports.signinRequired = function(req, res, next) {
	var user = req.session.user

	if (user.role == 0) {
		return res.redirect('/login')
	}

	next()

}

exports.adminRequired = function(req, res, next) {
	var user = req.session.user

	if (user.role <= 10) {
		return res.redirect('/login')
	}

	next()
}

