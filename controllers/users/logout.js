const { ctrlWrapper } = require("../../helpers");
const {
  UserModel: { User },
} = require("../../models");

const logout = async (req, res) => {
    const { _id } = req.user; 

    await User.findByIdAndUpdate(_id, { token: "" });
    
    res.status(200).json({ message: "No Content" });
};

module.exports = {
  logout: ctrlWrapper(logout),
};