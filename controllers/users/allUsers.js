const User = require("../../models/usersSchema.js");

// const requestError = require("../../utils/requestError.js");

const allUsers = async (req, res, next) => {
    const users = await User.find({}, {email: 1, password: 1});
    const count = await User.countDocuments({});
    res.json({
        count,
        data: users
    });
}

module.exports = allUsers;