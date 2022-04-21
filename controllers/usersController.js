const {User} = require('../models/auth')

class UsersController {
    async getCurrent(req, res){
        const {email, subscription} = req.user
        res.json({
            status: "success",
            code: 200,
            data: {
                user: {
                    email,
                    subscription
                }
            }
        })
    }

    async patchUser(req, res){
        if(!req.query){
            return res.status(400).json({"message": "missing field subscription"})
        }
        const {email, _id} = req.user;
        const {subscription} = req.query;
        await User.findByIdAndUpdate(_id, {subscription}, {new:true})
        res.json({
            status: "success",
            code: 200,
            data: {
                user: {
                    email,
                    subscription
                }
            }
        })
    }
}

module.exports = new UsersController;