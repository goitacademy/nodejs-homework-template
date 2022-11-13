const getAll = require('./getAll');
const getByIdContact = require('./getById');
const remove = require('./delete');
const update = require('./update');
const add = require('./add');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
    getAll,
    getByIdContact,
    remove,
    update, 
    add,
    updateStatusContact
};