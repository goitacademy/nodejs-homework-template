const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user !== null) {
      return res.status(409).send({"message": "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ email, password: passwordHash });

    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      console.log("Email");
      return res
        .status(401)
        .send({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log("Password");
      return res
        .status(401)
        .send({ message: "Email or password is wrong" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.email },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 } // "1h"
    );

    await User.findByIdAndUpdate(user._id, { token });

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    console.log(req.user.id)
    res.status(204).send({ message: 'No content'});
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  
  try {
    
    const authHeader = req.headers.authorization;
 
  if (typeof authHeader === "undefined") {
    return res.status(401).send({ message: "Not authorized" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Not authorized" });
  }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Not authorized" });
    }

    const user = await User.findById(decode.id);
   
    if (user === null) {
      return res.status(401).send({ message: "Not authorized" });
    }

    if (user.token !== token) {
      return res.status(401).send({ message: "Not authorized" });
    }

    res.status(200).send({ "email": user.email });
    })
   } catch (error) {
    next(error);
  }
}

module.exports = { register, login, logout, current };