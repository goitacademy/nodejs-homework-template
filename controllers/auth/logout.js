const { User } = require("../../models/user")

const logout = async (req, res) => {
    
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null })
    res.status(204).json({
        status: "success",
        code: 204,
        message: "This account was deleted",
    

    });
}

module.exports = logout;