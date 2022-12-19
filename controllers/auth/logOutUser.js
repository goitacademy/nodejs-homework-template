const { createError } = require("../../helpers");

const { WRONG_CREDENTIALS, LOGOUT_SUCCESSFULL } = require("./authConstants");

const { getUserById, updateUserById } = require("../../models/authModel/auth");

const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = process.env;

async function logOutUser(req, res, next) {
  try {
    const { authorization } = req.headers;

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw createError({
        status: 401,
        code: 401.01,
        message: "Unauthorized",
      });
    }

    const tokenInfo = jwt.verify(token, JWT_SECRET_KEY);

    if (!tokenInfo) {
      throw createError({ status: 400, message: WRONG_CREDENTIALS });
    }

    const user = await getUserById(tokenInfo.id);

    if (!user) {
      throw createError({ status: 400, message: WRONG_CREDENTIALS });
    }

    await updateUserById({ id: tokenInfo.id, body: { token: "" } });

    res.status(204).json({
      status: 204,
      message: LOGOUT_SUCCESSFULL,
    });
  } catch (error) {
    if (!error.status) {
      console.log(error, "logout controller");
    }
  }
}

module.exports = logOutUser;
