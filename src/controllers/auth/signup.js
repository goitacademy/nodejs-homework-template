const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/index");
const gravatar = require("gravatar");
// const {sendEmail} = require("../../helpers");


const signup = async (req, res, next) => {
  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`User with ${email} already exist `);
    }
    const avatarURL = gravatar.url(email)
const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));




    const result = await User.create({ email, password: hashPassword, avatarURL });
    res.status(201).json({
      status: "success",
      code: 201,
      user: { email: result.email, subscription: result.subscription, avatarURL },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
