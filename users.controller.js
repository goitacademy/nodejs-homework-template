const User = require('./models/user.model')
const validateUser = require('./utils/validation')
const service = require('./users.service');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET;

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = validateUser(req.body)
	if (error) return res.status(400).json({ message: error.details[0].message })
 

  const user = await User.findOne({ email })

  if (user) {
    return res.json({
      Status: "error",
      code: 409,
      data: "Conflict",
      message: "Email in use",
    });
  }
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();

    res.json({
      status: "success",
      code: 201,
      data: {
        user: {
          email: `${email}`,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    next(error);
  }
 
};

const login = async (req, res, next) => {
  const {email, password} = req.body;
  const user = await User.findOne({ email });

  if(!user || !user.validPassword(password)) {
    return res.json({
      status:'error',
      code: 400,
      data: 'Bad request',
      message: 'Email or password is wrong'
    })
  }

  const payload = {
    id: user.id,
  }
 
  const token = jwt.sign(payload, secret, { expiresIn: '3000s' });
  return res.json({
    status:'success',
    code: 200,
    data: {
      token: `${token}`,
      user: {
        email: `${email}`,
        subscription: "starter",
      }
    }
  })


};


const current = async (req, res, next) => {
  const { email } = req.user
  res.json({
    status: 'success',
    code: 200,
    data: {
     email: `${email}`,
     subscription: "starter"
    },
  })
}

const logout = async (req, res, next) => {
  const { id } = req.user;
  try {
      await service.userLogout(id);
      res.status(204).json();
  } catch (error) {
      next(error);
  }


}

module.exports = { signUp, login, current, logout};
