var express = require('express');
var router = express.Router();
var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Admin = require('../app/controllers/admin')
var Member = require('../app/controllers/member')
var Goods = require('../app/controllers/goods')
var Test = require('../app/controllers/test')


//Test
router.get('/test', Test.test)

// Index
router.get('/', Index.prevQuery, Index.prevUser ,Index.index)
router.get('/publish', Index.publish)
router.get('/purchase', Index.purchase)
router.post('/purchase/save', Index.savePurchase)
router.post('/publish/save', Goods.saveImg, Goods.saveGoods)
router.get('/category/:cid', Index.category)



//Goods
router.get('/goods/:id', Goods.detail)
router.post('/goods/save', Goods.saveGoods)


// Login & Reg
router.get('/reg', User.regShow)
router.post('/reg', User.regDeal)
router.get('/login', User.loginShow)
router.post('/login', User.loginDeal)
router.get('/logout', User.logout, Index.index)

//Member Center
router.get('/member/userinfo/:id', Member.userInfo)
router.post('/member/userinfo/save', User.signinRequired, Member.userInfoSave)
router.get('/member/message', Member.message)
router.get('/member/manage', Member.manage)



//Admin
router.get('/admin', User.signinRequired, User.adminRequired, Admin.index)
router.post('/admin/save/district', User.signinRequired, User.adminRequired, Admin.saveDistrict)
router.post('/admin/save/category', User.signinRequired, User.adminRequired, Admin.saveCategory)
router.post('/admin/save/message', User.signinRequired, User.adminRequired, Admin.saveMessage)
router.post('/admin/save/recency', User.signinRequired, User.adminRequired, Admin.saveRecency)
router.get('/admin/del/district', User.signinRequired, User.adminRequired, Admin.delDistrict)
router.get('/admin/del/category', User.signinRequired, User.adminRequired, Admin.delCategory)
router.get('/admin/del/message', User.signinRequired, User.adminRequired, Admin.delMessage)
router.get('/admin/del/recency', User.signinRequired, User.adminRequired, Admin.delRecency)
router.get('/admin/del/perchase', User.signinRequired, User.adminRequired, Admin.delPerchase)





module.exports = router

