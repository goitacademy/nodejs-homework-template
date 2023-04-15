const { registration} = require("../../service/users/userService");


module.exports = {
    registrationController: async (req, res)=> {
    const {
        email,
        password
    } = req.body;

    const newUser= await registration(email, password);
    res.status(201).json({
        user: {
        email: newUser.email,
        subsription: newUser.subscription
        }
    });
}
    
} 
