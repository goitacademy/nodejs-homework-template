const Users = require('../../models/user/usersSchema');

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        const newUser = await Users.create({ password, email});
        const { subscription } = newUser;
        
        res.status(201).json({
            user: {
                subscription,
                email
            }
        });
        
    } catch (err) {
        next(err);
    }
  
};

module.exports = register;