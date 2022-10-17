const createError = require('../../middleware/createError')
const {User, schemas} = require('../../models/users')

const changeSubscription = async(req, res) => {
    const {error} = schemas.subscription.validate(_id, req.body, {new: true})

    if(error) {
        throw createError(400, error.message)
    }

    const { _id } = req.user

    const reply = await User.findByIdAndUpdate(_id, req.body, { new: true })
    
    if (!reply) {
        throw createError(404)
    }
    
    res.json(reply)
}

module.exports = changeSubscription