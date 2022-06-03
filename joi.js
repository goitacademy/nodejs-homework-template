const Joi = require('@hapi/joi');

const patternContactAdd = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().max(50).required(),
  phone: Joi.string().min(6).max(20).required()
});

const patternContactUpdate = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email().max(50),
  phone: Joi.string().min(6).max(20)
});

const patternFavorite = Joi.object({
  favorite: Joi.boolean().required()
});

const patternUserAdd = Joi.object({
  email: Joi.string().email().max(50).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
  token: Joi.string(),
  owner: Joi.object()
})

const patternUserPatch = Joi.object({
  subscription: Joi.string().equal('starter', 'pro', 'business').required()
})

module.exports = {
  patternContactAdd,
  patternContactUpdate,
  patternFavorite,
  patternUserAdd,
  patternUserPatch
}