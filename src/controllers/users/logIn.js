const { userLogIn } = require("../../models/users");

const logIn = async (req, res, next) => {
  const { body } = req;
  const data = await userLogIn(body);
  if (!data) {
    return res
      .status(401)
      .json({ status: 401, message: "Email or password is wrong" });
  }
  return res.status(200).json({ status: 200, message: "success", data });
};
module.exports = logIn;
