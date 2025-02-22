const asyncHandler = require("express-async-handler");
const userModel = require("../../models/userModel");

const verifyUserByToken = asyncHandler(async (req, res) => {
  const token = req.params.verificationToken;
  const user = await userModel.getUser({ verificationToken: token });
  if (!user) {
    res.status(404);
    throw new Error("Not found user!");
  }
  
  await userModel.updateUserVerification(user.id);
  res.status(200).json({ code: 200, message: "Verification successful" });  
});

module.exports = { verifyUserByToken };
