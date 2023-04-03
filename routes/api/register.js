const passport = require("passport");
const passportJWT = require("passport-jwt");
const express = require("express");
require("dotenv").config();

const router = express.Router();

const { User, userValidationSchema } = require("../../models/user");
const { createUser } = require("../../controllers/users");

const secret = process.env.JWT_SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

router.post("/signup", async (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  const { email, password } = req.body;
  if (error) {
    return res.status(409).json(error.details[0].message);
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email id already in use",
      data: "Conflict",
    });
  }

  try {
    const user = await createUser(email, password);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
