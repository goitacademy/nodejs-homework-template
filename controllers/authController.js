const { User } = require("../models/userModel.js");
const { Conflict } = require("http-errors");

// const bcrypt = require("bcrypt")
// const jwt = require('jsonwebtoken');


// const { lineBreak } = require("../services")

//-----------------------------------------------------------------------------






const registrationController = async (req, res) => {
    const { email, password } = req.body;
    const userMailCheck = await User.findOne({ email });

    //! ПРОВЕРКА - если email уже используется кем-то другим:
    if (userMailCheck) {
        throw new Conflict(`Email ${email} in use`)
    }

    const newUser = await User.create({ email, password }); //! 1-вариант
    console.log("newUser:".green, newUser); //!

    res.status(201).json({
        status: "success",
        code: 201,
        user: {
            email,
            subscription: newUser.subscription
        }
    });
};


module.exports = {
    registrationController,
    // loginController
}



//todo ------------- OLD --> WORK --------------
// const { registration, login } = require("../services/authService.js")


// const registrationController = async (req, res) => {
//     const { email, password } = req.body;
//     await registration(email, password);

//     // res.json({ status: "success" });
//     res.status(200).json({
//         status: "success",
//         code: 200,
//         user: {
//             email,
//             subscription: "starter"
//         }
//     });
// };


// const loginController = async (req, res) => {
//     const { email, password } = req.body;
//     const token = await login(email, password);

//     res.json({ status: "success", token });
// };


// module.exports = {
//     registrationController,
//     loginController
// }