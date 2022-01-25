import User from '../model/user'

const findById = (id) => {
  return User.findById(id)
}

const findByEmail = (email) => {
  return User.findOne({ email })
}

const findByVerifyToken = (verificationToken) => {
  return User.findOne({ verificationToken })
}

const create = (body) => {
  const user = new User(body)
  return user.save()
}

const updateToken = (id, token) => {
  return User.updateOne({ _id: id }, { token })
}

const updateVerify = (id, status) => {
  return User.updateOne({ _id: id }, { verify: status, verificationToken: null })
}

const updateAvatar = (id, avatar) => {
  return User.updateOne({ _id: id }, { avatar })
}

export default { findById, findByEmail, create, updateToken, updateAvatar, findByVerifyToken, updateVerify }
