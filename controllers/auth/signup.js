const gravatar = require("gravatar");
const { users: service } = require("../../services");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await service.getOne({ email });
    if (user) {
      return res.status(409).json({
        status: "conflict",
        code: 409,
        message: "Email in use",
      });
    }

    // Create link to the user's avatar with Gravatar.
    // Save url in the avatarUrl field during user creation
    req.body.avatarURL = gravatar.url(email);

    const newUser = await service.add(req.body);
    res.status(201).json({
      status: "created",
      code: 201,
      message: "Successfully registered",
    });
  } catch (error) {}
};

module.exports = signup;
