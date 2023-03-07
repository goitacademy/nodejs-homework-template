const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
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

// userSchema.pre('save', async function(){
//   if(this.isNew){

// this.password= await bcrypt.hash(this.password, 10)
// const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//   }
// })
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt, bcrypt.genSaltSync(6));
};
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


const UserSchema = mongoose.model("user", userSchema);
module.exports = UserSchema;

// Регистрация
// const signup = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       throw new Conflict(`User with ${email} already exist `);
//     }
//     const avatarURL = gravatar.url(email)
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
