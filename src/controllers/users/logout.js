const { User } = require("../../models/users.schema")
const HTTP_CODS = require("../../helpers/httpCodes");

const logout = async (req, res)=> {
    await User.findByIdAndUpdate(req.user._id, {token: null});
    res .status(HTTP_CODS.OK)
        .json({
        status: "success",
        message: "Successfully logged out"
    })
};

module.exports = logout;