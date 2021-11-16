const {
    patchUser
} = require('../../model/auth')
const {UserModel} = require('../../db/userModel')

const patchUserController = async (req, res) => {
    const {_id} = req.user 
    const {subscription} = req.body
    const patched = await patchUser(_id, subscription)
    res.status(200).json({patched})
}
module.exports = {
    patchUserController
}