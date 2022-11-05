const {User} = require('../../models/user')
const {makeError} = require('../../helpers')

const logout = async(req, res, next) => {
    const {_id} = req.user
    const user = await User.findById(_id)
    if(!user){
        next(makeError(401))
    }
    await User.findByIdAndUpdate(_id, {token: ''})
    res.status(204).json({message: "No content"})
}

module.exports = logout