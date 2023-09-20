const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

// створюємо схему - вимоги до об'єкту
const ContactSchema = new Schema(
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
  },
  { versionKey: false, timestamps: true }
);

// middleware, яка оброблює помилку при записі в БД нового контакту
ContactSchema.post("save", handleMongooseError);

// перенесла схему запросів з contactsSchema
const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .message("Name must be in format: FirstName LastName")
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
    phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

// створюємо модель - клас, який буде працювати з колекцією контактів
const Contact = model("contact", ContactSchema);

module.exports = {Contact, schemas};
