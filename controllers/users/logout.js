const User = require('../../models/user')
const { RequestError } = require('../../helpers')


const logout = async (req, res, next) => { 
    try {
        const { _id: id } = req.user
        const user = await User.findById(id)
        if (!user) {
            throw RequestError(401, "Not authorized")
        }

        await User.findByIdAndUpdate(id, { token: "" })
        res.status(204).json()

    } catch (error) {
        next(error)
    }
}

module.exports = logout