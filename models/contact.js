const { Schema, model } = require("mongoose");
const Joi = require("joi"); //библиотека для проверки и валидации входных данных (например при добоавлении нового контакта чтобы был номер и имя, а не только имя)
const { handleMongooseError } = require("../helpers");

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; //регулярное выражение для проверки номера телефона
// const genreList = ["drama", "love"]

const contactSchema = new Schema( //Схема = требования к проекту
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: phoneRegex, //регулярное выражение для проверки номера телефона
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
    // genre:{
    //     type: String,
    //     required: true,
    //     enum: genreList
    // }
  },
  {
    versionKey: false, // исключит автоматическое добавление поля __v
    timestamps: true, // добавляет createdAt (время создания) и updatedAt (время последнего обновления) эллемента коллекции
  }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.boolean().required(),
  // genre:Joi.string().valid(...genreList).required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema); // класс который будет работаь с колеекцией. вместо json файла с номерами теперь будет он

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
