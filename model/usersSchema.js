import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import gravatar from "gravatar/lib/gravatar";
import { Role } from "../lib/constants";

const { Schema, model } = mongoose;

const usersSchema = new Schema(
  {
    name: { type: String, default: "Guest" },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).trim().toLocaleLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: {
        values: Object.values(Role),
        message: "Role is not allowed",
      },
      default: Role.USER,
    },
    token: {
      type: String,
      default: null,
    },
    avatar:{
      type: String,
      default: function (){
        return gravatar.url(this.email, {s: '250'}, true)
      },
    },
    idAvatarCloud:{
      type: String,
      default: null,
    }
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

usersSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

usersSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", usersSchema);

export default User;