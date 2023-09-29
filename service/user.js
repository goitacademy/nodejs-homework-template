const User = require("./schema/user");

const getUserByEmail = async (email) => {
    return User.findOne({email});
};

module.exports = {
    getUserByEmail,
};
    