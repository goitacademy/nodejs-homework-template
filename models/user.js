const { Schema, model } = require("mongoose");
const mongooseError = require("../helpers/mongooseErrors")

const userSchema = new Schema ({
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minlength: 6
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      avatarURL: {
        type: String,
      },
      token: String,
   
},
)

userSchema.post("save", mongooseError);

  const User = model("users", userSchema);

  module.exports = User