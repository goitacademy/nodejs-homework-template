const getAll = require('./getAll');
const getById = require('./getById')
const add = require('./add');
const remove = require('./remove');
const updateById = require('./updateById');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
    getAll,
    getById,
    add,
    remove,
    updateById,
    updateStatusContact,
}