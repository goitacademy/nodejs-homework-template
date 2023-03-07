const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const createToken = ({ _id: id, email, subscription }) => {
    const payload = {
        id,
        email,
        subscription,
    };
    console.log(SECRET_KEY);
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "48h" });
};

module.exports = createToken;