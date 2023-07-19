const { getAll, getById, add, updateById, deleteById, updateStatusContact } = require("./contacts");
const {register } = require("./auth")

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
    updateStatusContact,
    register,
}