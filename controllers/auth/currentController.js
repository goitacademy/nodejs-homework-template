const jsonwebtoken = require('jsonwebtoken')
const {UserModel} = require('../../db/userModel')

const currentController = async (req, res) => {
const {email, subscription} = req.user
    res.status(200).json({email, subscription})
}

module.exports = {
    currentController
}