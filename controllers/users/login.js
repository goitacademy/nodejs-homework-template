const { UserModel } = require("../../models");
var jwt = require("jsonwebtoken");

const { SECRET_WORD } = process.env;

const login = async (req, res) => {
  //get and verify data
  const { email, password } = req.body;
  if (!password || !email) {
    res.status(400);
    throw new Error("Please, provide all required fields");
  }
  // look for a contact and verify password
  const user = await UserModel.findOne({ email });

  if (!user || !user.getValid(password)) {
    res.status(401);
    throw new Error("Email or password is wrong");
  }
  //generate token
  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_WORD, { expiresIn: "3h" });

  //write token to user
  user.token = token;
  const updated = await user.save();
  if (!updated) {
    res.status(400);
    throw new Error("Unable to set token");
  }

  //return token
  res.json({
    status: "success",
    code: 200,
    data: {
      token: user.token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
