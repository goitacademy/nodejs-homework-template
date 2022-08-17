const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { auth: service } = require("../../service");

const { SECRET_KEY } = process.env;
const { REFRESH_SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password, role } = req.body;
    const user = await service.loginFind({ email });
    if (!user) {
        throw new Unauthorized("Email is wrong");
    };
    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!passwordCompare) {
        throw new Unauthorized("Password is wrong");
    };
    const userRoleCompare = user.role.includes(role);
    if (!userRoleCompare) {
        throw new Unauthorized("User with such email does not have such role");
    };
    if (!user.verify) {
        throw new Unauthorized("User not verify");
    };
    const payload = {
        id: user._id,
        role:role
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "30d" });
    await service.loginUpdate(user._id, { token, refreshToken });
    res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json({
        status: "success",
        code: 200,
        data: {
            token,
            refreshToken
        }
    });
};

module.exports = login;
