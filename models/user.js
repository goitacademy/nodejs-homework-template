import { Schema, model } from "mongoose";
// import { handleMongooseError } from "../helpers/index.js";
// import Joi from "joi";

// export const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
//   favorite: Joi.boolean(),
// });

// export const updateSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string().email(),
//   phone: Joi.string(),
//   favorite: Joi.boolean(),
// }).or("name", "email", "phone", "favorite");

// export const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required().messages({
//     "boolean.base": "field favorite must be false or true",
//     "any.required": "missing field favorite",
//   }),
// });

const userSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

// userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

export default User;
