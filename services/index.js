const contacts = require('./contact.service');
const email = require('./email.service');
const authService = require('./auth.service');
const updateUser = require('./user.service');
const uploadImage = require('./image.service');
const emailService = require('./email.service');
const findUser = require('./auth.service');


module.exports = {
    contacts, email, authService, uploadImage, updateUser, emailService, findUser,
};