const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { auth: service } = require("../../service");

const { REFRESH_SECRET_KEY } = process.env;

const refreshToken = async (req, res) => {
    const { cookie = "" } = req.headers;
    const [refreshToken, token] = cookie.split("=");

    if (refreshToken !== "refreshToken" || !token) {
        throw new Unauthorized('Not authorized');
    };
    const { id, role } = jwt.verify(token, REFRESH_SECRET_KEY);
    const payload = { id, role };
    const newRefreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "30d" });
    await service.funcRefreshToken(id, { newRefreshToken });
    res.cookie('refreshToken', newRefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json({
        status: "success",
        code: 200,
        data: {
            refreshToken: newRefreshToken
        }
    });
};

module.exports = refreshToken;
