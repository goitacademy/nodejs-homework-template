const express=require('express');
const router = express.Router();
const AuthController = require('../../controller/authController/authController')

router.post('/users/signup', AuthController.registration)

router.post('/users/login', AuthController.login)
// router.post('/pasword', AuthController.password)

router.post('/users/logout',AuthController.logout )
module.exports = router;



// 12:37
// Регистрация
// const signup = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       throw new Conflict(`User with ${email} already exist `);
//     }
    //.... const avatarURL = gravatar.url(email)
// const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//     const result = await User.create({ email, password: hashPassword, avatarURL });
//     res.status(201).json({
//       status: "success",
//       code: 201,
//       user: { email: result.email, subscription: result.subscription, avatarURL },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// 12:38
// Логин
// const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !user.comparePassword(password)) {
//       throw new Unauthorized("Email or password is wrong");
//     }
//     const payload = {
//       id: user._id
//     };
//     ......const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
//     await User.findByIdAndUpdate(user._id, { token });
//     res.json({
//       status: "success",
//       code: 200,
//       token: token,
//       user: { email: user.email,   subscription: user.subscription },
//     });
//   } catch (error) {
//     next(error);
//   }
// };










