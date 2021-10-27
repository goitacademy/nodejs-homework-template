// const User = require("../utils/userSchema")
const services = require("../services/user")
const jwt = require("jsonwebtoken")

const gravatar = require("gravatar")
const path = require("path")
const fs = require("fs/promises")
const avatarsDir = path.join(process.cwd(), "public/avatars")
// const tempDir = path.join(process.cwd(), "tmp")
const Jimp = require("jimp")
require("dotenv").config()

// console.log(avatarsDir)

=======
require("dotenv").config()


const register = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await services.getOne({ email })
    if (user) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: "Already exist",
      })
      return
    }


    const avatarUrl = gravatar.profile_url(email)
    const newUser = await services.addUser({ email, password, avatarUrl })
=======
    await services.addUser({ email, password })

    res.status(201).json({
      status: "success",
      code: 201,
      message: "success",
      data: {

        newUser,
      },
    })
  } catch (error) {
    console.log(error)
=======
        email,
        password,
      },
    })
  } catch (error) {

    next(error)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await services.getOne({ email })

    if (!user || !user.comparePassword(password)) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Неверный email или пароль",
      })
      return
    }
    const { SECRET_KEY } = process.env
    const payload = {
      id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY)
    await services.updateById(user._id, { token })
    res.json({
      status: "success",
      code: 200,
      data: {
        result: token,
      },
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {

  try {
    await services.updateById(req.user._id, { token: null })
    res.json({
      status: "success",
      code: 200,
      message: "Logout success",
    })
  } catch (error) {
    next(error)
  }
}

const current = async (req, res, next) => {
  try {
    await services.getById(req.user._id)
    res.json({
      status: "success",
      code: 200,
      message: "Success",
      data: {
        email: req.user.email,
        subscription: req.user.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

const updateAvatar = async (req, res, next) => {
  const { path: filePath, originalname } = req.file
  const userId = req.user._id
  const dateNow = Date.now()
  // console.log(dateNow)
  const fileName = path.join(avatarsDir, `${originalname}_${userId}_${dateNow}`)

  try {
    await fs.rename(filePath, fileName)
    await services.updateById(userId, { avatarUrl: fileName })
    res.status(201).json({
      status: "updatet",
      code: 201,
      newAvatar: fileName,
    })

    Jimp.read(fileName, (err, lenna) => {
      if (err) throw err
      lenna.resize(256, 256).quality(60)
    })
  } catch (error) {
    res.json({
      status: "error",
      code: 401,
      message: error.message,
    })
    console.log(error)

    fs.unlink(filePath)
    return next(error)
  }
}

=======

module.exports = {
  register,
  login,
  logout,
  current,

  updateAvatar,
=======

}
