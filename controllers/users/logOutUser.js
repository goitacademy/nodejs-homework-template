const { logout } = require('../../services/userServices')

const ctrlWrapper = require("../../utils/ctrlWrapper");

const logOutUser = async(req,res) => {

    await logout(req);
    res.status(204).json();
};

module.exports = { logOutUser: ctrlWrapper(logOutUser) };