const jwt = require("jsonwebtoken");
const { HttpError } = require("../Helpers");
exports.singToken = (id) =>
  jwt.sign({ id }, "secret", {
    expiresIn: "1h",
  });

exports.checkToken = (token) => {
  if (!token) throw new HttpError(401, "Invalid token");
  try {
    const { id } = jwt.verify(token, "secret");
    return id;
  } catch (error) {
    throw new HttpError(404, "Not login");
  }
};
