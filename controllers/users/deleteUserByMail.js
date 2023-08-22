const asyncHandler = require("express-async-handler");
const userModel = require("../../models/userModel");

const deleteUserByMail = asyncHandler(async (req, res) => {
  const email = req.query.email;
  const userToRemove = await userModel.deleteUser(email);
  if (!userToRemove) {
    res.status(404);
    throw new Error("Not found user!");
  } else {
    res
      .status(200)
      .json({
        code: 200,
        data: userToRemove,
        message: "User deleted from data base",
      });
  }
  // res.send("deleteUserByMail");
});

module.exports = { deleteUserByMail };
