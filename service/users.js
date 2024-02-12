const User = require("./schemas/user");

const getUser = async (body) => User.findOne(body);

module.exports = { getUser };
