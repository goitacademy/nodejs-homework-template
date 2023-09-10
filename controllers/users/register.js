const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const crypto = require("crypto");
const User = require("../../models/users");
const usersSchemas = require("../../schemas/registration");
const sendMail = require("../../helpers/sendMail");

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
      const verifyToken = crypto.randomUUID();
      await User.create({
        name,
        email,
        password: passwordHash,
        avatar: avatarURL,
        verifyToken: verifyToken,
      });
      await sendMail({
        to: email,
        subject: `Welcome on board, ${name}`,
        html: `<h1 style="color: #ff0000">To confirm your registration click on the link below:</h1> 
        
        <a href="http://localhost:8080/api/users/verify/${verifyToken}">Click me</a>`,
        text: "To confirm your registration click on the link below: \n http://localhost:8080/api/user/${verifyToken}",
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
