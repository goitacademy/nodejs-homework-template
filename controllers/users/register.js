const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const User = require("../../models/users");
const usersSchemas = require("../../schemas/registration");

async function register(req, res, next) {
  const response = usersSchemas.validate(req.body);
  if (typeof response.error !== "undefined") {
    return res.status(400).send({ message: "missing required name field" });
  } else {
    const { name, email, password } = req.body;
    const avatarURL = gravatar.url(email, {}, true);
    try {
      const user = await User.findOne({ email }).exec();

      if (user !== null) {
        return res.status(409).json({ error: "Email in use" });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: passwordHash,
        avatar: avatarURL,
      });
      res.status(201).json({
        user: {
          email,
          subscription: "starter",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = { register };
