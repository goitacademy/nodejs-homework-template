const { HttpError, handleReqError } = require('../../helpers')
const { updateSubscription } = require('../../models/users')

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {function} next 
 * @returns {Promise} - Об'єкт з результатом оновлення підписки користувача
 */
const updateSubscriptionCtrl = async (req, res, next) => {
    const { _id } = req.user
    const user = await updateSubscription(_id, req.body)

    if (!user) {
        return next(HttpError(404, "missing field"))
    }

    res.json({
        status: 'success',
        code: 200,
        data: {
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL
        }
    })
}

module.exports = handleReqError(updateSubscriptionCtrl)