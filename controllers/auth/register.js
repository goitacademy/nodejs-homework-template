const { User } = require("../../models/user");

const { createToken } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email });
  await newUser.setPassword(password);

  const payload = {
    id: newUser._id,
  };
  const token = createToken(payload);
  newUser.token = token;

  await newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
      },
      token,
    },
  });
};

module.exports = register;
