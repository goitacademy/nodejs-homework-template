const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");
const { User } = require("../models/users");
const { HttpError } = require("./error-func");

require("dotenv").config();

const { JWT_SECRET } = process.env;

async function auth(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
        return next(HttpError(401, "token type is not valid"));
    }

    if (!token) {
        return next(HttpError(401, "No token provided"));
    }

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if (!user) {
            return next(HttpError(404, "Not find user!"));
        }

        req.user = user;
    } catch (error) {
        if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError"
        ) {
            return next(HttpError(401, "Not authorized!"));
        }
        throw error;
    }

    next();
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../tmp"));
    },
    filename: function (req, file, cb) {
        cb(null, nanoid(6) + "-" + file.originalname);
    },
});

const upload = multer({
    storage,
});

module.exports = {
    auth,
    upload,
};
