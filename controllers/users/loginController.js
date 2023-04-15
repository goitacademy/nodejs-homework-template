const { login } = require("../../service/users/userService");

module.exports={
    loginController: async(req, res) => {
        const {
        email,
        password
    } = req.body;

    const { token, user } = await login(email, password);
    
    res.status(200).json({
        token,
        user: {
            user: user.email,
            subsription: user.subscription
        }
    });

        
    }
}