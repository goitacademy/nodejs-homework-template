const getAll = require('./getAll');
const getContactById = require('./getContactById');
const addContact = require('./add');
const updateById = require('./updateById');
const removeById = require('./removeById');

module.exports = {
    getAll,
    getContactById,
    addContact,
    updateById,
    removeById
}