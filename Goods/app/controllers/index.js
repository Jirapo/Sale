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


exports.prevQuery = function(req,res,next){

  // if (req.session.categories 
  //   && req.session.districts 
  //   && req.session.recencies) {

  //   next()

  // }else{
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

            next()
          })
        })
      })
 // }
}

exports.prevUser = function(req,res,next){

   if (req.session.user) {
    next()
   }else{
    User.findOne({role: 0},function(err, user){
      req.session.user = user
      next()
    })
   }
}

// index page
exports.index = function(req,res){

  Goods
    .find({})
    .exec(function(err, products){
      if (err) {
        console.log(err)
      }
        async.each(products, function( product, callback) {
          var date = product.meta.updateAt
          , duration = new Date().getTime() - date.getTime()
          , deadLine = product.deadline

          if(duration > deadLine*7*24*60*60*1000){
            product.onsale = false
            product.save(function(err,p){
               if (err) {
                console.log(err)
              }
              callback()
            })
          }else{
            callback()
          }

        }, function(err){
          if( err ) {
            console.log(err);
          } 

          Goods
            .find({})
            .populate({
              path: 'owner',
              select: 'dormitory qq'
            })
            .populate('recency', 'name')
            .populate('category', 'name')
            .exec(function(err, products){

              return res.render('index', {
                user: req.session.user ,
                categories: req.session.categories,
                products: products
              })
            })

        })

      })
    // })

   /*Goods
    .find({})
    .populate({
      path: 'owner',
      select: 'dormitory qq'
    })
    .populate('recency', 'name')
    .populate('category', 'name')
    .exec(function(err, products){

      return res.render('index', {
        user: req.session.user ,
        categories: req.session.categories,
        products: products
      })
    })*/
}

exports.publish = function(req,res){
  
  User.findOne({_id: req.session.user._id})
    .populate('districtId','name')
    .exec(function(err, user){

      if (req.query.gid) {

        Goods.findById(req.query.gid, function(err, product){
          if (err) {
            console.log(err)
          }

          return res.render('publish', {
            user: user,
            categories: req.session.categories,
            districts: req.session.districts,
            recencies: req.session.recencies,
            product: product
          })
        })
        
      }else{

        return res.render('publish', {
          user: user,
          categories: req.session.categories,
          districts: req.session.districts,
          recencies: req.session.recencies
        })
      }
    })
}


exports.purchase = function(req,res){
   Perchase
    .find({})
    .exec(function(err, purchases){
      return res.render('purchase', {
        user: req.session.user ,
        categories: req.session.categories,
        purchases: purchases
      })
    })
}
exports.savePurchase = function(req,res){
    var purchaseObj = req.body.purchase
    , purchase = new Perchase(purchaseObj)

    purchase.save(function(err, purchase) {
      if (err) {
        console.log(err)
      }

      res.redirect('/purchase')
    }) 
}

exports.category = function(req,res){
  var cid = req.params.cid

   Goods
    .find({category: cid})
    .populate({
      path: 'owner',
      select: 'dormitory qq'
    })
    .populate('recency', 'name')
    .populate('category', 'name')
    .exec(function(err, products){

      return res.render('index', {
        user: req.session.user ,
        categories: req.session.categories,
        products: products,
        cid: cid
      })
    })
}



