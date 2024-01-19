const jwt = require("jsonwebtoken");
const { HttpError } = require("../addoption");

exports.signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

exports.checkToken = (token) => {
  if (!token) throw HttpError(401, "Not logged in");
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    return id;
  } catch (err) {
    throw HttpError(401, "Not logged in");
  }
};


