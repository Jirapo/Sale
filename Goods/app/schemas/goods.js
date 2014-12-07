var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var GoodsSchema = new Schema({
  title: String,
  owner: {type: ObjectId, ref: 'User'},
  summary: String,
  person: String,
  phone: Number,
  pic: [String],
  deadline: {
      type: Number,
      default: 2
  },
  price: Number,
  recency: {
    type: ObjectId,
    ref: 'Recency'
  },
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  onsale:{
      type: Boolean,
      default: true
  },
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

// var ObjectId = mongoose.Schema.Types.ObjectId
GoodsSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

GoodsSchema.statics = {
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

module.exports = GoodsSchema