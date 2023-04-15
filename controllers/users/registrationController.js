const { registration} = require("../../service/users/userService");


module.exports = {
    registrationController: async (req, res)=> {
    const {
        email,
        password
    } = req.body;

    await registration(email, password);
    res.status(201).json({
        "message": "Please check your email and confirm registration"
    });
}
    
} 
