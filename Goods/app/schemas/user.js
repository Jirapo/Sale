var mongoose = require('mongoose')
var crypto = require('crypto')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

//var SALT_WORK_FACTOR = 10

var UserSchema = new Schema({
  name: {
    unique: true,
    type: String
  },
  password: String,
  // 0: nomal user
  // 1: verified user
  // 2: professonal user
  // >10: admin
  // >50: super admin
  role: {
    type: Number,
    default: 1
  },
  phone: {
    unique: true,
    type: Number,
  },
  qq: Number,
  districtId: {
    type: ObjectId, ref: 'District'
  },
  dormitory: String,
  goods: [{type: ObjectId, ref: 'Goods'}],
  // message: [{type: ObjectId, ref: 'Message'}],
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.pre('save', function(next) {
  var user = this

  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
    var md5 = crypto.createHash('md5');
    var password = md5.update(user.password).digest('base64');
    user.password = password
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()

})

UserSchema.methods = {
  comparePassword: function(_password, cb) {

    var md5 = crypto.createHash('md5');
    _password = md5.update(_password).digest('base64');
    
    if (_password == this.password) {
      cb(null,1)
    }else{
      return cb(null,0)
    }
  }
}

UserSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = UserSchema