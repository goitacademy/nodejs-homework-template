const User = require('../model/user')
const Users = require('../repository/usersDB')
// const createError = require('http-errors')

const registration = async (req, res, next) => {
    const { email } = req.body
    const user = await Users.findByEmail(email)
    if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already exist',
    })
    }
    
  try {
      const newUser = await Users.create(req.body)
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          email: newUser.email,
          subscription: newUser.subscription,
          id: newUser.id,
        }
      })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await Users.findByEmail(email)
  if (!user || !user.comparePassword(password)) {
    return res.status(400).json({
      status: 'error',
      code: 401,
      message: 'Email or password is wrong',
    })
    // throw new createError.BadRequest("Email or password is wrong");
  }
    
  try {
    const token = user.createToken();
    await Users.updateToken(user._id, token);
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  const { _id } = req.user
  await Users.updateToken(_id, null)
  res.json({
    status: "success",
    code: 204,
    message: "No Content"
  });
}

const getCurrentUser = async (req, res, next) => {
  const { email, subscription } = req.user
  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    }
  })
}

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
}