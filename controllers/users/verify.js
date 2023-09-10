require("dotenv").config();
const User = require("../../models/users");
const sendMail = require("../../helpers/sendMail");

async function verify(req, res, next) {
  const { token } = req.params;
  try {
    const doc = await User.findOne({ verifyToken: token }).exec();
    if (doc === null) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(doc.id, {
      isVerify: true,
      verifyToken: null,
    });
    return res.status(200).json({ message: "User verified" });
  } catch (error) {
    next(error);
  }
}

async function verifyAgain(req, res, next) {
  const { name, email } = req.body;
  if (email === null) {
    return res.status(400).json({ message: "missing required field email" });
  }
  try {
    const doc = await User.findOne({ email: email }).exec();
    if (doc.isVerify === true) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    await sendMail({
      to: email,
      subject: `Welcome on board, ${name}`,
      html: `<h1 style="color: #ff0000">To confirm your registration click on the link below:</h1> 
        
        <a href="http://localhost:8080/api/users/verify/${doc.verifyToken}">Click me</a>`,
      text: "To confirm your registration click on the link below: \n http://localhost:8080/api/user/${verifyToken}",
    });
    return res.status(200).json({ message: "Check your email" });
  } catch (error) {
    next(error);
  }
}

module.exports = { verify, verifyAgain };
