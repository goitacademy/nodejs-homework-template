const { userSignUp } = require("../../models/users");

const signUn = async (req, res, next) => {
  const { body } = req;
  const data = await userSignUp(body);
  if (!data) {
    return res
      .status(409)
      .json({ status: 409, message: "Conflict, email in use" });
  }

  res.status(201).json({ status: 409, message: "Created", data });
};

module.exports = signUn;
