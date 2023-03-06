const jwt = require("jsonwebtoken");
const User = require("../../db/users");
const { registration, login, findUser,logout } = require('../../services/authService')
const { joiRegisterSchema } = require("../../schema/joiRegisterSchema");
const bCrypt = require("bcrypt");

const registrationController = async(req, res) => {
    const { email, password } = req.body
    
    await registration(email, password)
    
    res.json({status:'success'})
 }
// const loginController = async (req, res) => {
//     const { error } = joiRegistrationSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ message: "Missing fields" });
//     }
//     const { email, password } = req.body;

//     const token = await login(email, password)

//     res.json({status:'success', token})

//  };

const loginController = async (req,res) => {
  const { error } = joiRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
    const { email, password } = req.body;
  const user = await findUser({ email });

  if (!user) {
    return res.status(409).json({ message: "Email in use" });
  }

  if (!(await bCrypt.compare(password, user.password))) {
    return res.status(409).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { _id: user._id, cratedAt: user.subscription },
    process.env.JWT_SECRET
  );
  // return token
  return res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logoutController = async (req, res) => {
  
  const { _id } = req.user;
    await logout({ _id });
    res.status(204).json('No Content');

  
};

module.exports = {
  registrationController,
    loginController,
  logoutController
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
