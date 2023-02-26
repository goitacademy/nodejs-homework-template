const { User } = require("../../models");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw NotFound("User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.send(`<!DOCTYPE html>
  <html>
      <h1>Verification sucess</h1>
      <a href="http://localhost:3000/Phonebook-frontend-new/">Login link</a>
  </html>`);
};

module.exports = { verifyEmail };
