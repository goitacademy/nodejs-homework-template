const { User } = require("../../model/user");

const logout = async (req, res) => {
    const {_id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" })
    
    res.status(204).json({
        message: "logout success"
    })
}

module.exports = logout