const { registration, login } = require('../models/authService');

const {userSchema} = require('../helpers/validation')


const registrationController = async (req, res) => {
    const { email, password } = req.body;
    userSchema.validate(req.body)
    const user = await registration(email, password);
    if (!user){
        return res.status(409).json({
            status: "error",
            code: 400,
            message: "Email is already in use",
            data: "Bad Request",
        });
    }
    
    res.status(201).json({
        message: "created",
        code: 201,
        user: {
            email: email,
            subscription: "starter",
        },
    });
};

const loginController = async (req, res) => {

};

module.exports = {
    registrationController,
    loginController
}