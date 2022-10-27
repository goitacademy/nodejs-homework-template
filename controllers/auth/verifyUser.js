const { User } = require("../../service/schemasAuth");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { RequestError } = require("../../helpers");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
    token,
  });
  res.json({
    code: 200,
    status: "success",
    message: "Verification successful",
  });
};

module.exports = verify;
