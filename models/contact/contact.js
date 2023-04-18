const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../../utils");

const categories = ["work", "family", "hobby", "rest", "other"];
const emailRegexp = /^\d{2}-\d{2}-\d{4}$/;

//Створюємо mongoose схему для того щоб контролювати що базу даних ми запишемо лише те що проходить валідацію (перевірку) цією схемою
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: categories,
      default: "other",
    },
    birthday: {
      type: String,
      match: emailRegexp,
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

//Додаємо мідлвар на contactSchema для правильного прокидування коду помилки (400) при отриманні неповного тіла для запису в базу даних
//Якщо валідація за схемою contactSchema провалиться то виконається ця мідлвара
contactSchema.post("save", handleMongooseError);

//Створюємо Joi схему на додавання об'єкту для того щоб контролювати що нам приходить
const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name"`,
    "string.empty": `"name" cannot be empty`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": `missing required "email"`,
      "string.empty": `"email" cannot be empty`,
    }),
  phone: Joi.number().required().messages({
    "any.required": `missing required "phone"`,
    "string.empty": `"phone" cannot be empty`,
  }),
  favorite: Joi.boolean(),
  category: Joi.string().valid(...categories),
  birthday: Joi.string().pattern(emailRegexp),
});

//Створюємо Joi схему на PATCH об'єкту для того щоб контролювати що нам приходить і змінювати тільки статус поля favorite
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
