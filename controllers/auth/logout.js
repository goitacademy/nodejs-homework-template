const User = require("../../models/userModel");

const logout = async (req, res, next) => {
    const { _id } = req.user;

    console.log(_id);
    await User.findByIdAndUpdate(_id, { token: null });
    
    res.status(204).json({
    status: "success",
    code: 204,
    message: 'No Content',
  });
}

module.exports = logout;