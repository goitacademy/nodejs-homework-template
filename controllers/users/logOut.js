const { User } = require("../../models/user/index");

const logOut = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" })
    
    res.json({message: "Logout success"})
}

module.exports = logOut;