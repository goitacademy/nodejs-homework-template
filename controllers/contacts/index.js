const getAll = require('./getAll');
const getByIdContact = require('./getById');
const remove = require('./delete');
const update = require('./update');
const add = require('./add');
const updateFavoriteContact = require('./updateFavoriteContact');

module.exports = {
    getAll,
    getByIdContact,
    remove,
    update, 
    add,
    updateFavoriteContact
};