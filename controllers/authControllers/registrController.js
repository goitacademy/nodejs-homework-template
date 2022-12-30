const { User } = require("../../models/userModel.js");
const { Conflict } = require("http-errors");

const bcrypt = require("bcryptjs")

// const { lineBreak } = require("../services")


//-----------------------------------------------------------------------------
const registrController = async (req, res) => {
    const { email, password } = req.body;
    const userMailCheck = await User.findOne({ email });

    //! ПРОВЕРКА - если email уже используется кем-то другим:
    if (userMailCheck) {
        throw new Conflict(`Email ${email} in use`)
    }

    //! ------------------------ Хеширование и засолка password --------------------------
    //? 1-вариант
    //! Пароль в явном виде (если не используется хеширование и засолка в userSchema (1 вариант))
    // const newUser = await User.create({ email, password }); 

    //? 2-вариант (самый простой)
    //!  Хеширование и засолка password с помошью bcryptjs (или bcrypt)
    // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    // const newUser = await User.create({ email, password: hashPassword }); 

    //? 3-вариант (самый сложный)
    //!  Хеширование и засока password с помошью bcryptjs (или bcrypt) используется в userSchema
    const newUser = new User({ email });
    newUser.setPassword(password);
    newUser.save();
    //! _______________________ Хеширование и засолка password _________________________

    console.log("\nnewUser:".green, newUser); //!

    res.status(201).json({
        status: "success",
        code: 201,
        user: {
            email,
            subscription: newUser.subscription
        }
    });
};


module.exports = registrController;





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