const { User } = require("../models/schema");
const { authToken } = require("../models/auth.js");

const middleware = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.json({
        status: "error",
        code: 401,
        message: "Token is empty",
        });
    }
    const user = await authToken(auth);
    const checkUser = await User.findOne({
        _id: user.id,
        password: user.password,
        email: user.email,
    }).lean();

    if (!checkUser) {
        return res.json({
        status: "error",
        code: 401,
        message: "User does not exist",
        });
    }
    req.user = user;
    next();
};

module.exports = { middleware };
