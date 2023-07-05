const getAll = require("./getAll");
const getOneById = require("./getContactById");
const add = require("./addContact");
const remove = require("./deleteContact");
const update = require("./updateContact");

module.exports = {
    getAll,
    getOneById,
    add,
    remove,
    update,
};
