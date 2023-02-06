const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");
 
const userSchema = new Schema({
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user']      
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
  token: {
    type: String,
    default: null
  }
  });

userSchema.pre('save', async function()  {
  if(this.isNew) {
    this.password = await bcrypt.hash(this.password,10)
  }  
});

const User = model("User", userSchema);

module.exports = {
  User
};
