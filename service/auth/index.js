const registerFind = require('./registerFind');
const registerCreate = require('./registerCreate');
const loginFind = require("./loginFind");
const loginUpdate = require("./loginUpdate");
const logout = require("./logout");
const funcRefreshToken = require("./refreshToken");

module.exports = {
    registerFind,
    registerCreate,
    loginFind,
    loginUpdate,
    logout,
    funcRefreshToken
}
