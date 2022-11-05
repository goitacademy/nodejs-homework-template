const {User} = require('../../models/user')
const {makeError} = require('../../helpers')

const patchSub = async(req,res,next) => {
    const {_id} = req.user

    const user = await User.findById(_id)
    if(!user){
        makeError(401)
    }
    const {subscription} = req.body
    await User.findByIdAndUpdate(_id, {subscription})
    res.status(200).json({subscription})
}

module.exports = patchSub