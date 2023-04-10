// const Users = require('../../models/user/usersSchema');

const current = async (req, res, next) => {
    try {
        const { email, subscription } = req.user;
        
        res.status(200).json({
            user: {
                email,
                subscription
            }
    })
        
    } catch (err) {
        next(err);
    }
  
};

module.exports = current;