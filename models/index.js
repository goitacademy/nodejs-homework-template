const { Contact } = require('./contact');
const {schemas} = require('./contact');
const { User } = require('./user');
const { authSchemas } = require('./user');

module.exports = {
    Contact,
    schemas,
    User,
    authSchemas
};