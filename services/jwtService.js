const jwt = require("jsonwebtoken");
const HttpError = require("../controllers/helpers/error");

exports.signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

exports.checkToken = (token) => {
  // if (!token) throw new HttpError(401, "Not logged in..");

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    return id;
  } catch (error) {
    throw new HttpError(401, "Not logged in..");
  }
};
