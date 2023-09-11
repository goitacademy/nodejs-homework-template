const User = require("./schemas/users");

const getUser = async (body) => User.findOne(body);

module.exports = { getUser };
