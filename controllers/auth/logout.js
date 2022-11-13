const {User} = require('../../models/user')


const logout = async (req, res, next) => {
    try {
        const { _id: id } = req.user
        await User.findByIdAndUpdate(id, { token: null })
        res.status(204).json({
            message: 'No content'
        })
    }
    catch (error) {
        next(error)
    }
}
    
module.exports = logout