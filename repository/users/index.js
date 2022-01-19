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

module.exports = {findByEmail, create, updateToken, findById}