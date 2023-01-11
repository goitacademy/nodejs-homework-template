const User = require("../../service/schemas/user");
const service = require("../../service/users");
const { hashPassword, comparePassword } = require("../../password");
const { generateToken } = require("../../token");

const registerUser = async (req, res, next) => {
  const user = new User(req.body);
  user.password = await hashPassword(user.password);
  try {
    const { email, subscription } = await service.createUser(user);
    await user.save();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 120_000_000,
    });
    res.status(200).json({ user: { email, subscription } }).end();
  } catch (e) {
    if (e.code === 11000) {
      res
        .status(409)
        .json({
          message: "Email in use",
        })
        .end();
    } else {
      throw err;
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await service.regLogUser(email);
  const passwordMatches = await comparePassword(password, user.password);
  try {
    const token = await generateToken({ id: user._id });
    updateUser(user._id, { token });

    if (passwordMatches) {
      res
        .json({
          status: "success",
          code: 200,
          user: {
            email: user.email,
            subscription: user.subscription,
            id: user._id,
          },
        })
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 120_000_000,
        });
    } else {
      res
        .status(401)
        .json({
          message: "Email or password is wrong",
        })
        .end();
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const logoutUser = (req, res) => {
  res.cookie("token", "", { maxAge: 0 }).status(200).end();
};

const getCurrentUser = async (req, res) => {
  const { _id } = req.user;

  const { email, subscription } = await service.currentUser(_id);

  res.json({ email, subscription }).status(200).end();
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};

// try {
//   const user = await User.findOne({ email });

//   if (user) {
//     req.status(409).json("message", "Email in use");
//     return res.redirect("/");
//   }
//   const newUser = new User({ email, subscription });
//   newUser.setPassword(password);
//   await newUser.save();
//   req.status(201).json("user", {
//     email: email,
//     subscription: subscription,
//   });
//   res.redirect("/");
// } catch (e) {
//   console.error(e);
//   next(e);
// }
