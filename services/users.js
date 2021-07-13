const { UsersRepository } = require('../repository')
const cloudinary = require('cloudinary').v2
const { nanoid } = require('nanoid')
const { sendEmail } = require('./email')
const fs = require('fs').promises
require('dotenv').config()
const { ErrorHandler } = require('../helpers/errorHandler')

class UserService {
  constructor() {
    this.cloudinary = cloudinary
    this.cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    })
    this.repositories = {
      users: new UsersRepository(),
    }
  }

  async create(body) {
    const verifyToken = nanoid()
    const { email } = body

    try {
      await sendEmail(verifyToken, email)
    } catch (e) {
      throw new ErrorHandler(503, e.message, 'Service Unavailable')
    }

    const data = await this.repositories.users.create({ ...body, verifyToken })
    return data
  }

  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email)
    return data
  }

  async findById(id) {
    const data = await this.repositories.users.findById(id)
    return data
  }

  async update(id, body) {
    const data = await this.repositories.users.update(id, body)
    return data
  }

  async uploadAvatar(pathFile) {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader.upload(
        pathFile,
        {
          folder: 'Avatars',
          transformation: {
            width: 250,
            crop: 'fill',
          },
        },
        (error, result) => {
          console.log(result)
          if (error) reject(error)
          if (result) resolve(result)
        },
      )
    })
  }

  async updateAvatar(id, pathFile) {
    try {
      const {
        secure_url: avatar,
        public_id: idCloudAvatar,
      } = await this.uploadAvatar(pathFile)
      const oldAvatar = await this.repositories.users.getAvatar(id)
      this.cloudinary.uploader.destroy(
        oldAvatar.idCloudAvatar,
        (err, result) => {
          console.log(err, result)
        },
      )
      await this.repositories.users.updateAvatar(id, avatar, idCloudAvatar)
      await fs.unlink(pathFile)
      return avatar
    } catch (err) {
      throw new ErrorHandler(null, 'Error upload avatar')
    }
  }

  async verify({ token }) {
    const user = await this.repositories.users.findByField({
      verifyToken: token,
    })
    if (user) {
      await user.updateOne({ verify: true, verifyToken: null })
      return true
    }
    return false
  }

  async reVerify (email) {
    const user = await this.repositories.users.findByEmail({ email, verify: false })
    if (user) {
      await sendEmail(user.verifyToken, email)
      return true
    }
    return false
  }
}

module.exports = UserService
