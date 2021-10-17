/* eslint-disable eol-last */
/* eslint-disable indent */
const { User } = require('../../models')

const updateSubscription = async(req, res) => {
    const { _id } = req.user
    console.log(req.body)

    const userInfo = await User.findByIdAndUpdate(_id, req.body, { new: true })
    res.status(200).json({
        status: 'success',
        code: 200,
        data: {
            email: userInfo.email,
            subscription: userInfo.subscription
        }
    })
}

module.exports = updateSubscription