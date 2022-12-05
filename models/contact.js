const { Schema, model } = require("mongoose");
const Joi = require("joi");

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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `'name'is a required field` }),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };

//* Мідлвар для викидання правильного коду помилки
// contactSchema.post("save", (error, data, next) => {
//   const { name, code } = error;
//   error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
//   next();
// });
