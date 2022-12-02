const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const updateContact = require('./put');
const deleteContact = require('./delete');

module.exports = {
    getAll,
    getById,
    add,
    updateContact,
    deleteContact
}