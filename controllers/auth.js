const path = require('path')
const mkdirp = require('mkdirp')
const { Conflict, BadRequest } = require('http-errors')
const User = require('../model/user')
const Users = require('../repository/usersDB')
const { sendSuccessRes } = require('../helpers/sendSuccessRes')
const UploadService = require('../services/upload-file')


const uploadAvatar = async (req, res) => {
  const id = String(req.user._id)
  const file = req.file

  const resultDestination = path.join(__dirname, '../', 'public/avatars', id)
  await mkdirp(resultDestination)

  const UploadServ = new UploadService(resultDestination)
  const avatarUrl = await UploadServ.save(id, file)
  const result = await Users.updateAvatar(id, avatarUrl)
  return sendSuccessRes(res, 
    {
      avatarUrl: result.avatarUrl,
    },
  )

}

const registration = async (req, res) => {
  const { email } = req.body
  const user = await Users.findByEmail(email)
  if (user) {
    throw new Conflict('Email is already exis')
  }
    
  const newUser = await Users.create(req.body)
  return sendSuccessRes(res, 
    {
      email: newUser.email,
      subscription: newUser.subscription,
      id: newUser.id,
      avatarUrl: newUser.avatarUrl,
    },
    201
  )
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await Users.findByEmail(email)
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest("Email or password is wrong");
  }
    
  const token = user.createToken();
  await Users.updateToken(user._id, token);
  return sendSuccessRes(res, 
    {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarUrl: user.avatarUrl,
      }
    }
  )
}

const logout = async (req, res) => {
  const { _id } = req.user
  await Users.updateToken(_id, null)
  res.json({
    status: "success",
    code: 204,
    message: "No Content"
  });
}

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user
  sendSuccessRes(res, 
    {
      email,
      subscription,
    }
  )
}

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
  uploadAvatar,
}
