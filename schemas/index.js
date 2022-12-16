const contactPostSchema = require('./contactPostSchema.js');
const contactPutSchema = require('./contactPutSchema.js');
const contactFavoriteSchema = require('./contactFavoriteSchema.js');
const usersPostSchema = require('./usersPostSchema');
const usersSubscSchema = require('./usersSubscSchema');

module.exports = {
  contactPostSchema,
  usersSubscSchema,
  contactPutSchema,
  contactFavoriteSchema,
  usersPostSchema,
};