const User = require("../../models/user");
require("dotenv").config();

const { ctrlWrappers } = require("../../helpers");

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" })
res.status(204, "No Content").end();
}

module.exports = {logout: ctrlWrappers(logout)}