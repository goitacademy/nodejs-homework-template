const { User } = require("../db/users");
const bCrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


async function registration(email, password) {
  const user = new User({ email, password });
  await user.save();
}

async function login(_id, token) {
  await User.findByIdAndUpdate(_id, { token });
};

async function findUser({ email }) {
  const user = await User.findOne({ email });
  return user;
};

// const login = async (email, password) => {
//     const { error } = joiRegistrationSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ message: 'Missing fields' });
//   }
//     const user = await User.findOne({ email })
    
//     if (!user) {
//         return res.status(409).json({ message: "Email in use"
// });
//     }

//     if (!await bCrypt.compare(password, user.password)) {
//        return res.status(409).json({ message: "Wrong password" });
//     }

//     const token = jwt.sign({ _id: user._id, cratedAt: user.subscription }, process.env.JWT_SECRET)
//     // return token
//     return res.status(200).json({
//     token,
//     user: {
//       email: user.email,
//       subscription: user.subscription,
//     },
//   });
// };

module.exports = {
  registration,
    login,
  findUser
};
