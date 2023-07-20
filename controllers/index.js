const { getAll, getById, add, updateById, deleteById, updateStatusContact } = require("./contacts");
const { register, login } = require("./users")

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
    updateStatusContact,
    register,
    login,
}