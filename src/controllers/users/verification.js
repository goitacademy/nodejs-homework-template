const { json } = require("express");
const { userVerification } = require("../../models/users");

const verification = async (req, res, next) => {
  const { verificationToken } = req.params;
  const data = await userVerification(verificationToken);
  if (!data) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }

  return res
    .status(200)
    .json({ status: 200, message: "Verification successful" });
};

module.exports = verification;
