const User = require("../../models/user");

const { ctrlWrapper } = require("../../decorators/index");


const signout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});    
    
    res.status(204).json({
        message: "No Content"
    });
};

module.exports = { signout: ctrlWrapper(signout) };