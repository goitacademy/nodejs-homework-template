const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});
userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(5));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema);

const userRegister = async ({ email, password }) => {
  try {
    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    const message = {
      status: "success",
      code: 201,
      data: {
        message: "Register complete!",
      },
    };

    return message;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { User, userRegister };

// router.post("/users/register", async (req, res, next) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       console.log("user:", user);
//       res.json({
//         status: "error",
//         code: 409,
//         data: "Conflict",
//         message: "User already exists!",
//       });
//     }
//     try {
//       const newUser = new User({ email });
//       newUser.setPassword(password);
//       await newUser.save();

//       res.json({
//         status: "success",
//         code: 201,
//         data: {
//           message: "Register complete!",
//         },
//       });
//     } catch (error) {
//       next(error);
//     }
//   });
