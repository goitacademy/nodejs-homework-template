const { getAll, getById, add, updateById, deleteById, updateStatusContact } = require("./contacts");
const { register, login, getCurrent, logout} = require("./users")

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
    updateStatusContact,
    register,
    login,
    getCurrent,
    logout,
}