const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
// const gravatar = require('gravatar');

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
  avatarURL: { type: String },
  // token: {
  //   type: String,
  //   default: null,
  // },
  
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
