const { Schema, model } = require("mongoose");

const crypto = require('crypto');

const Joi = require("joi");

const handleMongooseError = require('../utils/handleMongooseError');



const userSchema = Schema(
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    avatarURL: String,

  },
  { versionKey: false, timestamps: true }
);

// userSchema.pre('save', function() {

// if(this.isNew){

//     const emailHash = crypto.createHash('md5').update(this.email).digest('hex');
    
//     this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=wavatar`;
// }
// });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
}

const User = model("user", userSchema);

module.exports = { User, schemas};
