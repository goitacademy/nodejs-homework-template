const { sendSuccessRes } = require('../../helpers')

const { User } = require('../../models')
const logout = async (req, res) => {
    const {_id} = req.user
    const result = await User.findByIdAndUpdate(_id,{token: null})
    const {email, subscription} = result
    sendSuccessRes(res,{email, subscription})
}

module.exports = logout