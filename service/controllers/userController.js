const { User } = require("../Schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const SECRET = process.env.SECRET;

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
    console.log("~user");
  } catch (err) {
    return next(err);
  }

  if (user) {
    return res.status(409).json({
      message: "Email in use",
    });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashPassword,
      supscription: "starter",
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email });
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(401).json({
      message: "Email is wrong",
    });
  } else {
    let isPasswordValid;
    try {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } catch (err) {
      return next(err);
    }

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Password is wrong",
      });
    } else {
      const payload = { id: user._id };
      const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

      try {
        await User.findByIdAndUpdate(user._id, { token });
        return res.status(200).json({
          token,
          user: {
            email: user.email,
            subscription: user.subscription,
          },
        });
      } catch (err) {
        return next(err);
      }
    }
  }
};

const logOut = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndUpdate(_id, { token: "" });
  } catch (err) {
    return next(err);
  }
  res.status(204).json({});
};

const current = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

// const changeSubscription = async (req, res, next) => {
//   const { id, subscription } = req.body;
//   const subscriptionType = ["starter", "pro", 'business'];

//   if (!subscription) {
//     res.status(400).json({ message: "missing field subscription" });
//   } else {
//     try {
//       const updateSub = await User.findByIdAndUpdate({_id: id}, {subscription});
//       if (!updateSub) {
//         return res.status(404).json({ message: "Not found" });
//       } else res.status(200).json(updateSub);
//     } catch (error) {
//       next(error);
//     }
//   }
// };

module.exports = { signUp, logIn, logOut, current };
