const contactsCtrl = require('../controllers/contactsController');
const ctrlWrapper = require("./ctrlWrapper");
const handelMongooseError = require("./handleMongooseError");

module.exports =  {
    ctrlWrapper,
    contactsCtrl,
    handelMongooseError,
};