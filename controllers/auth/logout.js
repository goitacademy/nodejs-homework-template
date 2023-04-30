const {User} = require("../../models");

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: null});

    res.json({
        status: 204,
        message: "Logout success"
    })
    // res.status(204).json();
}

module.exports = logout;