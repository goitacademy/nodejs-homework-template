const { Schema, model } = require("mongoose"); // імпортуємо з mongoose дві функції Schema і model
const { handleMongooseError } = require("../helpers");

// створюємо схему mongoose
const contactSchema = new Schema(
  {
    name: {
      type: String, // тип поля
      required: [true, "Set name for contact"], // вказуємо обов'язкове поле чи ні
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false, // значення за замовчуванням
    },
  },
  { versionKey: false, timestamps: true }
);

// додаємо до схеми міделвару обробку невірного статутсу помилок
contactSchema.post("save", handleMongooseError);

// створюємо модель. В аргументах назву колекціїї передаємо в однині
const Contact = model("contact", contactSchema);

module.exports = Contact;
