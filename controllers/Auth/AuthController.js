const jwt = require("jsonwebtoken");
const Users = require("../../db/users");
const {registration,login} = require('../../services/authService')

const registrationController = async(req, res) => {
    const { email, password } = req.body
    
    await registration(email, password)
    
    res.json({status:'success'})
 }
const loginController = (req, res) => { };

module.exports = {
  registrationController,
  loginController,
};

// async function register(req, res, next) {
//   const { email, password, username, about } = req.body;

//   const isAlreadyRegistered = await Users.exists({ email });

//   if (isAlreadyRegistered) {
//     return res.status(400).json({
//       code: 400,
//       data: { message: "Email already exists." },
//     });
//   }

//   const entity = new User({ email, username, about });
//   entity.setPassword(password);

//   await entity.save();

//   return res.status(201).end();
// }

// module.exports = {
//   login,
//   register,
// };
