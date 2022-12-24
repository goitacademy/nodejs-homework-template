import mongoose, { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';


const usersSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
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
  
    avatarURL: {
    type: String,
  },
  token: {
    type: String,
    default:null,
  },
  verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
});

usersSchema.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT)
  );
};

usersSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

usersSchema.methods.setAvatarUrl = function (email) {
  this.avatarURL = gravatar.url(email, { protocol: "http" });
};

const User = model("users", usersSchema);

export default User;
