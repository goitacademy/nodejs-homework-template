const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMogooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ["starter", "pro", "business"]; 
const usersSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },

    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: ""
    }
  },
  { versionKey: false, timestamps: true }
);
// якщо валідація не пройдена викидаємо помилку
usersSchema.post("save", handleMogooseError);

// схема валідації реєстрації
const signUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  
});
// схема валідації авторизації
const logInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
// схема валідації оновлення підписки
const updateSubscription = Joi.object({
  subscription: Joi.string().valid(...subscriptionList).required(),
});
const schemas = {
  signUpSchema,
  logInSchema,
  updateSubscription,
};
// створюємо модель
const User = model("User", usersSchema);

module.exports = {
  User,
  schemas,
};


