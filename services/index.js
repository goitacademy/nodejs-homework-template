const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const remove = require('./remove');
const update = require('./update');
const updateStatus = require('./patch');

module.exports = {
    getAll,
    getById,
    add,
    remove,
    update,
    updateStatus,
};