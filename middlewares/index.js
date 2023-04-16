const asyncFuncCatch = require("./asyncFuncCatch");
const { validationAddContact, validationUpdContact, validationUpdStatusContact } = require("./contactsValidation");
const { userValidation, userTokenValidation } = require("./usersValidation.js");
const avatarUpload = require('./avatarsMiddleware')

module.exports = { asyncFuncCatch, validationAddContact, validationUpdContact, validationUpdStatusContact, userValidation, userTokenValidation, avatarUpload };