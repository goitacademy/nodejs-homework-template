const { Schema, model } = require("mongoose"); // імпортуємо з mongoose дві функції Schema і model

const { handleMongooseError } = require("../helpers");

// створюємо схему mongoose
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // зазначеємо чи є це поле унікальним, тобто запобігаємо створенню користувачів з однаковими email
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

// додаємо до схеми міделвару обробки невірного статутсу помилок
userSchema.post("save", handleMongooseError);

// створюємо модель: викликаємо функцію model, перший аргумент им'я колекції, другий - назву mongoose схеми. В аргументах им'я колекціїї передаємо в однині
const User = model("user", userSchema);

module.exports = User;
