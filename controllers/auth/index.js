const login = require("./login");
const register = require("./register");
const { controllersWrapper } = require("../../helpers/")

module.exports = {
    login: controllersWrapper(login),
    register: controllersWrapper(register)
}