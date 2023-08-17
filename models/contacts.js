const express = require("express");
const Contact = require("./schemas/contact");
const User = require("./schemas/users");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const secret = "secret word";
const passportJWT = require("passport-jwt");
const passport = require("passport");
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
const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;

    next();
  })(req, res, next);
};

const listContacts = async (page, limit, favorite) => {
  try {
    const skip = (page - 1) * limit;
    let query = {};
    if (favorite !== undefined) {
      query.favorite = favorite;
    }
    return Contact.find(query).skip(skip).limit(limit);
  } catch (err) {
    return err;
  }
};

const getContactById = async (contactId) => {
  try {
    const res = Contact.findOne({ _id: contactId });
    return res.then((res) => res).catch((err) => false);
  } catch (err) {
    return err;
  }
};

const removeContact = async (contactId) => {
  try {
    return Contact.findByIdAndDelete({ _id: contactId });
  } catch (err) {
    return err;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    return await Contact.create({
      name,
      email,
      phone,
    });
  } catch (err) {
    console.log("validation failed: ");
    return console.table(err.details);
  }
};

const updateContact = async (contactId, body) => {
  try {
    return Contact.findByIdAndUpdate({ _id: contactId }, body);
  } catch (err) {
    console.log("validation failed: ");
    console.table(err.details);
    return { message: "validationError", err };
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    await Contact.findByIdAndUpdate({ _id: contactId }, body);
    return Contact.findById({ _id: contactId });
  } catch (err) {
    return { message: "validationError", err };
  }
};

const signup = async (email, password) => {
  try {
    const hash = bcrypt.hashSync(password, salt);
    return User.findOne({ email }).then((data) => {
      if (data) {
        return { message: "Email in use" };
      }
      return User.create({
        email,
        password: hash,
      });
    });
  } catch (err) {
    return err;
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { message: "401" };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { message: "401" };
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    user.token = token;
    await user.save();

    return { user, token };
  } catch (err) {
    return err;
  }
};

const logout = async (id) => {
  const user = await User.findById(id);

  user.token = null;
  await user.save();
  return user;
};

module.exports = {
  logout,
  auth,
  login,
  signup,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
