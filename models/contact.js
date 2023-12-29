const { Schema, model } = require("mongoose");
const Joi = require("joi"); // joi - для перевірки даних, які приходять із фронтенда

const handleMongooseError = require("../middleswares/handleMongooseError");

const contactSchema = new Schema(
  {
    // для перевірки даних, які відправляємо на бекенд
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);  // для того, щоб показувало не версію документа, а дату створення обьекта

contactSchema.post("save", handleMongooseError);

// joi - схема для перевірки даних, які приходять із фронтенда
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

const schemas = {
  updateFavoriteSchema,
  addSchema,
};

module.exports = {
  Contact,
  schemas,
};
