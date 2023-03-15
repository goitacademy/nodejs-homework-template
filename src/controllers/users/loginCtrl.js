const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { findUserInDb, updateUser } = require("../../services");
const { userValidation } = require("../../middlewares");
require("dotenv").config();

const loginCtrl = async (req, res) => {
  const { error } = userValidation.validate(req.body);

  const sendErrorResponse = (code, message) => {
    return res.status(code).json({ message: message });
  };

  if (error) {
    return sendErrorResponse(400, error.details[0].message);
  }

  const registeredUser = await findUserInDb(req.body.email);

  if (!registeredUser) {
    return sendErrorResponse(401, "Email or password is wrong");
  }

  const { id, email, password, subscription } = registeredUser;
  const rightUser = await bCrypt.compareSync(req.body.password, password);

  if (!rightUser) {
    return sendErrorResponse(401, "Email or password is wrong");
  }

  const payload = {
    id,
    email,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

  await updateUser(id, { token: token });
  return res.status(200).json({
    token: token,
    user: {
      email: email,
      subscription: subscription,
    },
  });
};

module.exports = loginCtrl;
