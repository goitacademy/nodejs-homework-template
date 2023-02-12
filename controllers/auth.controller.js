const { User } = require('../mod/user');
const { HttpError } = require('../helpers/index');
const { Conflict, Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);


  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      data: {
        user: {
          email,
          id: savedUser._id,
          subscription: savedUser.subscription,
        },
      },
    });
  } catch (error) {
    if (error.message.includes('E11000 duplicate key error')) {
      //   throw new HttpError(409, 'User with this email already exists');
      throw Conflict('Email in use(409)');
    }
    throw new HttpError(400, 'Error');
  }
}

// 1. Find user by email
// 2. I user not exist => throw an error 401
// 3. If user exist => check password
// 4. If password is the same => then return 200

async function login(req, res, next) {
  const { email, password } = req.body;

  const storedUser = await User.findOne({
    email,
  });

  if (!storedUser) {
    throw new Unauthorized('email is wrong(401)');
  }

  const isPasswordValid = await bcrypt.compare(password, storedUser.password);

  if (!isPasswordValid) {
    throw new HttpError(401, 'password is wrong');
  }

  const payload = { id: storedUser._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '4h' });

  await User.findByIdAndUpdate(storedUser._id, { token });

  return res.status(200).json({
    data: {
      token,
    },

    // token: token,
    // user: {
    //   email,
    //   subscription: storedUser.subscription,
    //   id: storedUser._id,
    // },
  });
}


async function logout(req, res, next) {
  const storedUser = req.user;

  await User.findByIdAndUpdate(storedUser._id, { token: "" });

  return res.status(204).end();
}



async function upSubscription(req, res, next) {
  const { id } = req.user;
  console.log("id", id);

  const { subscription } = req.body;
  console.log("subscription", subscription);

  const upUser = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(upUser);
}





module.exports = {
  register,
  login,
  logout,
  upSubscription,
};
