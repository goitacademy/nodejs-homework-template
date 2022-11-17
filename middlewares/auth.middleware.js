const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../routes/api/schemasUser");

const { JWT_SECRET } = process.env;

async function auth(req, res, next) {
    console.log("auth middleware", req.headers.authorization);
    const authHeader = req.headers.authorization || "";

    const [tokenType, token] = authHeader.split(" ");
    if (tokenType === "Bearer" && token) {
        try {
            const verifiedToken = jwt.verify(token, JWT_SECRET);
            console.log("token is valid", verifiedToken);

            const user = await User.findById(verifiedToken._id);
            if (!user) {
                next(new Unauthorized("No user with such id"));
            }

            if (!user.token) {
                next(new Unauthorized("token is invalid"));
            }

            console.log("user:", user);
            req.user = user; // NOTE: pass user to next middleware

            return next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                next(new Unauthorized(error.name));
            }
            if (error.name === "JsonWebTokenError") {
                next(new Unauthorized(error.name));
            }

            throw error;
        }
    }

    return next(new Unauthorized("No token"));
}

module.exports = {
    auth,
};