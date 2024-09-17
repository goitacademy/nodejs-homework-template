const Users = require('../../models/user/usersSchema');
const {signToken} = require('../../utils');
const { createSignToken } = signToken;


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        const user = await Users.findOne({ email }).select('+password');

        if (!user) return res.status(401).json({ message: "Email or password is wrong"});
        
        const passwordIsValid = await user.checkPassword(password, user.password);

        if (!passwordIsValid) return res.status(401).json({ message: "Email or password is wrong" });
        
        const token = createSignToken(user._id);

        await Users.findByIdAndUpdate(user._id, { token });
        
        const { subscription } = user;

        res.status(201).json({
            token, 
            user: {
                subscription,
                email
            }
        });
        
    } catch (err) {
        next(err);
    }
  
};

module.exports = login;