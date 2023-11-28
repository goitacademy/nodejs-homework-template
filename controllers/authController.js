const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

async function registerAuthController(req, res, next) {
  const { name, email, password } = req.body; 

  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: passwordHash });

    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    next(error);
  }
}

async function loginAuthController(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user === null) {
      console.log("EMAIL");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log("PASSWORD");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 } // token expires in one our
    );

    await User.findByIdAndUpdate(user._id, { token }).exec();

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function logoutAuthController(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null }).exec();

    console.log({ token_canceled: null });
    res.send({ message: "Token canceled" });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

async function currentAuthController(req, res, next) {
  try {    

    const authHeader = req.headers["authorization"];
    const [bearer, token] = authHeader.split(" ", 2);

    console.log("currentAuthController", { bearer, token });
        
    res.status(200).send({ message: "Token current" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerAuthController,
  loginAuthController,
  logoutAuthController,
  currentAuthController,
};
