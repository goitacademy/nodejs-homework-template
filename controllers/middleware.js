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
    const token = auth.split(" ")[1];
    const user = await authToken(token);

    if (!user) {
        return res.json({
        status: "error",
        code: 401,
        message: "Invalid token",
        });
    }

    const checkUser = await User.findOne({
        _id: user.id,
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
