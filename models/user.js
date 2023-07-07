const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
    {
        password: {
          type: String,
          required: [true, 'Set password for user'],
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
        token: String
      },
      {
        versionKey: false,
      }
)

userSchema.post("save", (error, data, next) => {
    error.status = 400;
    next();
  });


  const registerSchema = Joi.object({
    password: Joi.string()
    .required()
    .error(new Error("missing required password field")),
    email: Joi.string()
    .required()
    .error(new Error("missing required email field")),
    subscription:Joi.string()
  })

  const User = model("user",userSchema);

  module.exports ={User,registerSchema}