const getAllContacts = require('./getAllContacts');
const getOneContactById = require('./getOneContactById');
const addNewContact = require('./addNewContact');
const changeContactById = require('./changeContactById');
const deleteContact = require('./deleteContact');

module.exports = {
    getAllContacts,
    getOneContactById,
    addNewContact,
    changeContactById,
    deleteContact
}