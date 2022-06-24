const { authService } = require("../services");

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({
      email: user.email,
      subscription: user.subscription,
      id: user._id,
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

// const loginUser = async (req, res, next) => {
//   try {
//     const token = await authService.loginUser(req.body);
//     // res.json(token);
//     res.json({
//       status: "success",
//       code: 200,
//       data: {
//         token,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const loginUser = async (req, res, next) => {
    try {
        const token = await authService.loginUser(req.body);
        res.json(token);
    } catch (e) {
        next(e);
    }
};

const logoutUser = async (req, res, next) => {
    try {
        await authService.logoutUser(req.user._id);
        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
};




module.exports = {
registerUser,
loginUser,
logoutUser,
};

