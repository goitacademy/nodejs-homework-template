const addContact = require('./addContact');
const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const removeContactById = require('./removeContactById');
const updateContactById = require('./updateContactById');
const { controllerWrapper } = require('../../helpers');

module.exports = { 
    addContact: controllerWrapper(addContact),
    getAllContacts: controllerWrapper(getAllContacts),
    getContactById: controllerWrapper(getContactById),
    removeContactById: controllerWrapper(removeContactById), 
    updateContactById: controllerWrapper(updateContactById),
}