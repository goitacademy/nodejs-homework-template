const {User} = require('../../models/user')
const {makeError} = require('../../helpers')

const current = async(req, res, next) => {
    const {_id} = req.user

    const user = await User.findById(_id)
    if(!user){
        makeError(401)
    }
    const {email, subscription} = user
    res.status(200).json({email, subscription})
}

module.exports = current