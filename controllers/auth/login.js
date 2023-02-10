const {findUser, findAndUpdate} = require("../../services/index");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env;

const HttpError = require("../../helpers/HttpError");

async function login(req, res, next) {
    const { email, password } = req.body;

    const isUserValid = await findUser({
        email,
    });

    if (!isUserValid) {
        throw new HttpError(401, "Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(password, isUserValid.password);

    if (!isPasswordValid) {
        throw new HttpError(401, "Email or password is wrong");
    }

    const payload = { id: isUserValid._id };

    const token = jwt.sign(payload, JWT_SECRET);
    
    const updatedUser = await findAndUpdate(
        isUserValid._id,
        { token: token },
        { new: true }
    );

    res.json({
        token: updatedUser.token,
        user: {
          email: isUserValid.email,
          subscription: isUserValid.subscription,
        },
    });
}

module.exports = {login};