const { User } = require('../../models');
const { Conflict } = require('http-errors');

async function signupUser(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const registrationUser = await User.findOne({ email });
    if (registrationUser) {
      throw new Conflict(`User with ${email} already exist`);
    }

    const newUser = new User({ name, email });
    newUser.setPassword(password);
    newUser.save();
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        newUser,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = signupUser;
