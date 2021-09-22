const { Schema, Types, model } = require('mongoose')
const Joi = require('joi')

const orderSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { versionKey: false, timesstamps: true }
)

const joiSchema = Joi.object({
  name: Joi.string().required(),
})

const Order = model('order', orderSchema)

module.exports = { Order, joiSchema }
