const { findUserToVerify, updateUser } = require("../../services");

const verificationCtrl = async (req, res) => {
  const { verificationToken } = req.params;

  const userToVerify = await findUserToVerify(verificationToken);

  if (!userToVerify) {
    return res.status(404).json({ message: "User not found" });
  }

  await updateUser(userToVerify._id, { verificationToken: null, verify: true });

  return res.status(200).json({ message: "Verification successful" });
};

module.exports = verificationCtrl;
