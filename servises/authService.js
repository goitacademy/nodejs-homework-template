// const signup = async (name, email, password) => {
//   const user = await User.findOne({ email });

//   if (user) {
//     return res.json({
//       status: "error",
//       code: 409,
//       message: "Email in use",
//       data: "Conflict",
//     });
//   }

// const newUser = new User({ name, email });
// newUser.setPassword(password);
// newUser.save();

//   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//   const newUser = await User.create({ name, email, password: hashPassword });

//   return newUser;
// };

// const login = async (email, password) => {
//   const user = await User.findOne({ email });
//   const validPassword = bcrypt.compareSync(password, user.password);

//   if (!user || !validPassword) {
//     return res.json({
//       status: "error",
//       code: 401,
//       message: "Email or password is wrong",
//       data: "Bad request",
//     });
//   }

//   const payload = {
//     id: user._id,
//     // username: user.username,
//   };

//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
//   return token;
// };

// const getCurrent = async (name, email, password) => {
//   const { authorization = "" } = req.user;
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       message: `Authorization was successful: ${username}`,
//     },
//   });
// };

// module.exports = { signup, login };
