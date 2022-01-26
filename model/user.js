import pkg from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt";
import { randomUUID } from "crypto";
import gravatar from "gravatar/lib/gravatar";
import { Role } from "../lib/constants";
const { Schema, model } = pkg;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "Guest",
    },
    email: {
      type: String,
      required: [true, "Set email for user"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S*/;
        return re.test(String(value).trim().toLocaleLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
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
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250" }, true);
      },
    },
    idAvatarCloud: {
      type: String,
      default: null,
    },
    isVerify: { type: Boolean, default: false },
    verifyTokenEmail: {
      type: String,
      default: randomUUID(),
    },
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

export default User;
