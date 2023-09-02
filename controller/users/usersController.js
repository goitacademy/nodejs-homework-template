const User = require('../../schemas/users');
const { usersService } = require('../../service');
const { schemaUser } = require('../../middlewares/joiValidation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSignup = async (req, res, next) => {
  try {
    const { error } = schemaUser.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const body = req.body;
    const { email, password } = body;
    const user = await User.findOne({ email }).lean();
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email is already in use',
        data: 'Conflict',
      });
    }
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
    const result = await usersService.userSignup(email, hashedPassword);
    return res.status(201).json({
      status: 'success',
      code: 201,
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { error } = schemaUser.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Incorrect email or password',
        data: 'Unauthorized',
      });
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const secret = process.env.SECRET;
    const token = await jwt.sign(payload, secret, { expiresIn: '1h' });
    const result = await usersService.userLogin(user, token);
    return res.json({
      status: 'success',
      code: 200,
      token: result.token,
      user: {
        email: result.email,
        subscription: result.subscription,
      }
    });
  } catch (error) {
    next(error);
  };
};

const userLogout = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Logout'
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unknown error" });
  };
};
            
const userCurrent = async (req, res) => {
  try {
    res.status(200).json({
      message: 'current'
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unknown error" });
  };
};

module.exports = {
  userSignup,
  userLogin,
  userLogout,
  userCurrent,
};