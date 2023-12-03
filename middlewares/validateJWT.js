// middlewares/validateJWT.js
const moment = require("moment");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/contacts");
const { SECRET_KEY } = require("../utils/variables");

// Remove Token Not authorized
const updateToken = async (_id, tokenRemove) => {
  return await User.findByIdAndUpdate(
    { _id },
    { $set: { token: tokenRemove } },
    { new: true }
  );
};

const ensureAuthenticated = async (req, res, next) => {
  const tokenRemove = null;

  if (!req.headers.authorization) {
    // return res.status(403).json({
    return res.status(StatusCodes.UNAUTHORIZED).json({
      result: null,
      message: "Your request doesn't have authorization header",
    });
  }

  // Bearer eyJ
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const _id = decodedToken.Id;

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(payload.Id);

    if (payload.exp <= moment().unix()) {
      await updateToken(_id, tokenRemove);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        result: null,
        message: "Invalid token.",
      });
    }

    if (!user || user.token !== token) {
      await updateToken(_id, tokenRemove);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        result: null,
        message: "Not authorized",
      });
    }

    req.user = payload;

    next();
  } catch (error) {
    await updateToken(_id, tokenRemove);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      result: null,
      message: "Failed to authenticate token.",
    });
  }
};

module.exports = {
  ensureAuthenticated,
};
