const { registration, login } = require('../models/authService');

// const {userSchema} = require('../helpers/validation')


const registrationController = async (req, res) => {
    const { email, password } = req.body;
    // const reqValidate = userSchema.validate(req.body)
    await registration(email, password);
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
    const { email, password } = req.body;
    // const reqValidate = userSchema.validate(req.body)
    const token = await login(email, password);
    res.status(200).json({
        token
    });
};

module.exports = {
    registrationController,
    loginController
}

// const registrationController = async (req, res) => {
//     const { email, password } = req.body;
//     const reqValidate = userSchema.validate(req.body)
//     const user = await registration(email, password);
//     if (!user) {
//         res.status(400).json({
//             status: "error",
//             code: 400,
//             message: reqValidate.error,
//         });
//     }
//     res.status(201).json({
//         message: "created",
//         code: 201,
//         user: {
//             email: email,
//             subscription: "starter",
//         },
//     });
// };