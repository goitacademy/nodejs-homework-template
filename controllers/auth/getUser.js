/* eslint-disable eol-last */
/* eslint-disable indent */
const { User } = require('../../models')

const getUser = async(req, res) => {
    const { _id } = req.user
    const userInfo = await User.findById(_id)
    res.status(200).json({
        status: 'success',
        code: 200,
        data: {
            email: userInfo.email,
            subscription: userInfo.subscription
        }
    })
}

module.exports = getUser