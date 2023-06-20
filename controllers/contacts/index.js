const {getAll} = require('./getAll');
const {getById} = require('./getById');
const {add} = require('./add');
const {update} = require('./update');
const {updateStatusContact} = require('./updateStatusContact');
const {remove} = require('./remove');

module.exports = {
    getAll,
    getById,
    add,
    update,
    updateStatusContact,
    remove
}