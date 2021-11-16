const {UserModel} = require('../../db/userModel')
const jsonwebtoken = require('jsonwebtoken')
const {
    signout
} = require('../../model/auth')

const signoutController = async (req, res) => {
    const {_id} = req.user
    const user = await UserModel.findByIdAndUpdate(_id, {token: null})
    res.status(204).json({message: 'no content'})
}

module.exports = {
    signoutController
}