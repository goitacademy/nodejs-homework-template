const { ctrlWrapper } = require("../../helpers");
const { User } = require("../../models");

const logout = async (req, res) => {
    const {_id} = req.user;
    await User.findbyIdAndUpdate({token: ""});

    res.status(200).json({
        message: "Logout"
    })
}

module.exports = ctrlWrapper(logout);