const { User } = require("../../model")
const {Unauthorized} = require('http-errors')

const currentController = async (req, res, next)=>{
    try {
        const { _id } = req.user
        console.log(req.user);
        const currentUser = await User.findById(_id, 'email subscription');
        if (!currentUser) {
            throw new Unauthorized('Not authorized')
        }
        const { email, subscription } = currentUser;
        res.status(200).json({ status: 'ok', code: 200, data: { email, subscription }} )
    }    catch (error) {
          next(error)
    };
}

module.exports = currentController