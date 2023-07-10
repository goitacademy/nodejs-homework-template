const { Contact } = require('./schemaContactMongoose');
const { User } = require('./schemaUserMongoose');
const schemaJoiContact = require('./shemaContactJoi');
const schemaJoiUser = require('./shemaUserJoi');

module.exports = {
    Contact,
    User,
    schemaJoiContact,
    schemaJoiUser,
};
