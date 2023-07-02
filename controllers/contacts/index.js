const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const deleteById = require('./deleteById');
const updateById = require('./updateById');
const updateStatusContact = require('./updateStatusContact');

const { decorator } = require('../../helpers');

module.exports = {
    getAll: decorator(getAll),
    getById: decorator(getById),
    add: decorator(add),
    deleteById: decorator(deleteById),
    updateById: decorator(updateById),
    updateStatusContact: decorator(updateStatusContact),
}