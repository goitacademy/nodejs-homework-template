
const {
    signin
} = require('../../model/auth')
const jsonwebtoken = require('jsonwebtoken')
const {UserModel} = require('../../db/userModel')

const signinController = async (req, res) => {
    const {email, password} = req.body
    const token = await signin(email, password)

    const {_id, mail, subscription} = await jsonwebtoken.verify(token, process.env.SECRET_WORD)
    const useToUpdateToken = await UserModel.findByIdAndUpdate(_id, {token})

    res.status(200).json({token, user: {mail, subscription}})
}


module.exports = {
    signinController
}