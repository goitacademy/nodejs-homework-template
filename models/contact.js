const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;
const Joi = require('joi');
const { MAX_AGE, MIN_AGE } = require('../libs');

const nameRegexp = /^[a-zA-Z. ']+$/;
const emailRegexp =
  /^[-!#$%&'*+/=?^_`{|}~A-Za-z0-9]+(?:\.[-!#$%&'*+/=?^_`{|}~A-Za-z0-9]+)*@([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]/;
const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[ -./0-9]*$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      match: nameRegexp,
    },
    age: {
      type: Number,
      default: null,
      max: MAX_AGE,
      min: MIN_AGE,
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);

contactSchema.virtual('status').get(function () {
  if (this.age >= 40) {
    return 'old';
  }
  return 'young';
});

const createJoiSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).min(3).max(30).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).length(14).required(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: Joi.bool().optional(),
});

const updateJoiSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).min(3).max(30).optional(),
  email: Joi.string().pattern(emailRegexp).optional(),
  phone: Joi.string().pattern(phoneRegexp).length(14).optional(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: Joi.bool().optional(),
}).or('name', 'email', 'phone', 'favorite', 'age');

const queryJoiSchema = Joi.object({
  limit: Joi.number().integer().min(2).max(100).optional(),
  skip: Joi.number().integer().min(0).optional(),
  page: Joi.number().integer().min(1).optional(),
  favorite: Joi.bool().optional(),
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model('contact', contactSchema);
module.exports = {
  Contact,
  createJoiSchema,
  updateFavoriteJoiSchema,
  updateJoiSchema,
  queryJoiSchema,
};
