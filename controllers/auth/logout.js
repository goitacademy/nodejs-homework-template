const { User } = require("../../models");
const { sendSuccessRes } = require('../../helpers');

const logout = async (req, res) => {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });

    sendSuccessRes(res, null, 200);
}

module.exports = logout;
