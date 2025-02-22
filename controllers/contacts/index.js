const getAll = require("./getAll");
const getById = require("./getContactById");
const add = require("./add");
const updateById = require("./updateById");
const removeById = require("./removeById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    removeById,
    updateStatusContact
}