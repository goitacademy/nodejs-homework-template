const User = require('../../models/user')

const findById = async (id) => {
    return await User.findById(id);
}

const findByEmail = async (email) => {
    return await User.findOne({email})
}

const create = async (body) => {
    const user = new User(body);
    return await user.save();
}

const updateToken = async (id,token) => {
    return await User.updateOne({_id:id}, {token})
}

const updateAvatarUrl = async (id,avatarURL) => {
    return await User.updateOne({_id:id}, {avatarURL})
}

const findByVerifyToken= async (verifyTokenEmail) => {
    return await User.findOne({verifyTokenEmail})
}

const updateVerifyToken = async (id,status) => {
    return await User.updateOne({_id:id}, {isVerify:status,verifyTokenEmail:null})
}

module.exports = {findByEmail, create, updateToken, findById, updateAvatarUrl, findByVerifyToken, updateVerifyToken}