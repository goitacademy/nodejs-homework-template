const jwt = require("jsonwebtoken");
const { User } = require("./schema");
require("dotenv").config();

const authToken = async (auth) => {
    const token = auth.split(" ")[1];
    const tokenVerify = jwt.verify(token, process.env.SECRET);
    const checkUser = await User.findOne({ _id: tokenVerify.id });
    return checkUser;
    };

    module.exports = {
    authToken,
};
