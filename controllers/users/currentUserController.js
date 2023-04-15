const { User } = require("../../service/users/userSchema");

module.exports = {
    currentUserController: async (req, res) => {
        const {_id} = req.user;
        const user= await User.findById(_id);

        res.status(200).json({
                user: user.email,
                subsription: user.subscription
            
        });
    }
}