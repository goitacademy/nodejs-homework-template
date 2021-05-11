const jwt = require('jsonwebtoken')
const jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')
// const cloudinary = require('cloudinary').v2
// const { promisify } = require('util')
require('dotenv').config()
const Users = require('../model/users')
const { HttpCode, subscription } = require('../helpers/constants')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY 

// For cloudinary
// cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME, 
//   api_key: process.env.CLOUD_API_KEY, 
//   api_secret: process.env.CLOUD_API_SECRET, 
// })
// const uploadToCloud = promisify(cloudinary.uploader.upload)

const signup = async (req, res, next) => {
    const { email } = req.body
    const user = await Users.findByEmail(email)
    if (user) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: 'Email is already use',
      })
    }
    try {
        const newUser = await Users.createUser(req.body)
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            user: {
                id: newUser.id,
                email: newUser.email,
                subscription: newUser.subscription,
                avatar: newUser.avatar,
            },
        })
    } catch (e) {
        next(e)
    }
 }

const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user?.validPassword(password)
    if (!user || !isValidPassword) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Invalid credentials',
        })
    }
    const payload = { id: user.id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(user.id, token)
    return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        user: { token },
    })
}

const logout = async (req, res, next) => {
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
}

const current = async (req, res, next) => {
   try {
    const tokenToVerify = req.user.token;
    const { id } = jwt.verify(tokenToVerify, JWT_SECRET_KEY);
    const { email, subscription } = await Users.findById(id);
    return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        user: {
                id, 
                email,
                subscription,
            },
      })
    } catch (e) {
      next(e)
    }
}

const updateSubscription  = async (req, res, next) => {
  try {
    const tokenToVerify = req.user.token;
    const { id } = jwt.verify(tokenToVerify, JWT_SECRET_KEY);
    const user = await Users.updateSubscription(id, req.body)
    if (user) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        user: {
                id: user.id, 
                email: user.email,
                subscription: user.subscription,
        },
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
}
    
const onlyStarter = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      message: `Only ${subscription.STARTER}`,
    },
  })
}

const onlyPro = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      message: `Only ${subscription.PRO}`,
    },
  })
}

const onlyBusiness = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      message: `Only ${subscription.BUSINESS}`,
    },
  })
}

const updateUserAvatar = async (req, res, next) => {
  const { id } = req.user
  const avatarUrl = await saveAvatarUser(req)
  await Users.updateAvatar(id, avatarUrl)
  // const { idCloudAvatar, avatarUrl } = await saveAvatarUserToCloud(req) // For cloudinary
  // await Users.updateAvatar(id, avatarUrl, idCloudAvatar) // For cloudinary
  return res
    .status(HttpCode.OK)
    .json({
      status: 'success',
      code: HttpCode.OK,
      user: { avatarUrl }
    })
}

const saveAvatarUser = async (req) => {
  const FOLDER_AVATARS = process.env.FOLDER_AVATARS
  // req.file
  const pathFile = req.file.path
  const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`
  const img = await jimp.read(pathFile)
  await img.autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile)
  try {
    await fs.rename(
      pathFile,
      path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar),
  )
  } catch(e) {
      console.log(e.message)
  }
  const oldAvatar = req.user.avatar
  if (oldAvatar.includes(`${FOLDER_AVATARS}/`)) {
   await fs.unlink(path.join(process.cwd(), 'public', oldAvatar))
 }

  return path.join(FOLDER_AVATARS, newNameAvatar).replace('\\', '/')
}


// For cloudinary
// const saveAvatarUserToCloud = async (req) => {
//   const pathFile = req.file.path
//   const { public_id: idCloudAvatar, secure_url: avatarUrl } = await uploadToCloud(
//     pathFile,
//     {
//     public_id: req.user.idCloudAvatar?.replace('Avatars/', ''),
//     folder: 'Avatars',
//     transformation: { width: 250, height: 250, crop: "pad" },
//     },
//   )
//   await fs.unlink(pathFile)
//   return { idCloudAvatar, avatarUrl }
// }
  
module.exports = {
  signup,
  login,
  logout,
  current,
  updateSubscription,
  onlyStarter,
  onlyPro,
  onlyBusiness,
  updateUserAvatar,
}