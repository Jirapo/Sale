var mongoose = require('mongoose')
var User = mongoose.model('User')
var Category = mongoose.model('Category')
var District = mongoose.model('District')
var Message = mongoose.model('Message')
var Recency = mongoose.model('Recency')
var Goods = mongoose.model('Goods')


var _ = require('underscore')


//message
exports.manage = function(req,res){

  Goods.find({owner: req.session.user._id})
    .exec(function(err, products){
      
      return res.render('m_manage', {
        categories: req.session.categories ,
        products: products ,
        user: req.session.user ,
        order: 1
      })
    })
}


//message
exports.message = function(req,res){
  
    Message.find()
      .exec(function(err, messages){
        return res.render('m_message', {
          categories: req.session.categories ,
          messages: messages ,
          user: req.session.user ,
          order: 0
        })
      })
}

// user info
exports.userInfo = function(req,res){

  User.findOne({_id: req.session.user._id})
    .populate('districtId','name')
    .exec(function(err, user){

      return res.render('m_user', {
        user: user ,
        categories: req.session.categories ,
        districts: req.session.districts ,
        order: 2
      })
    })
    
}

exports.userInfoSave = function(req,res){
  var _user = req.body.user
  var id = _user.uid
  var isPublish = parseInt(req.body.publish)
  var newUser

  User.findById(id, function(err, user) {
    if (err) {
      console.log(err)
    }

    newUser = _.extend(user, _user)

    newUser.save(function(err, user) {
      if (err) {
        console.log(err)
      }

      req.session.user = user

      if (isPublish) {
        res.redirect('/publish') 
      }else{
        res.redirect('/member/userInfo/' + user._id)      
      }
    })
  })
}
