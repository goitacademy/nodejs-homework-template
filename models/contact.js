const { Schema, model } = require("mongoose");
const Joi = require("joi"); //библиотека для проверки и валидации входных данных (например при добоавлении нового контакта чтобы был номер и имя, а не только имя)
const { handleMongooseError } = require("../helpers");

// !Joi применяется для валидации данных полученых от пользователя, в то время как с помощью Mongoose вы создаете схемы для MongoDB, которые позволяют структурировать данные, взаимодействовать с базой данных и сохранять данные в ней. Сначала проверка происходит по Joi схеме, а мотом уже корректные данные передаются для сохранения и обработки через Mongoose.


const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; //регулярное выражение для проверки номера телефона
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const genreList = ["drama", "love"]

const contactSchema = new Schema( //Схема = требования к проекту
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true, // создает уникальный индекс в MongoDB для поля name в коллекции пользователей + к этому еще нужно в настройках коллекци в mongoDB зайти на вкладку Indexes и увидеть там что в список было добавлено нужное нам уникальное свойство. если оно не добавилось - добавить его там вручную через кнопку create index  
    },
    email: {
      type: String,
      required: true,
      match: emailRegex,
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
    owner:{ //Поле owner позволяет связывать документы текущей коллекции с документами в коллекции "user"
      type: Schema.Types.ObjectId,
      ref:"user",
      required: true,
    }
  },
  {
    versionKey: false, // исключит автоматическое добавление поля __v
    timestamps: true, // добавляет createdAt (время создания) и updatedAt (время последнего обновления) эллемента коллекции
  }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.boolean().required(),
  // genre:Joi.string().valid(...genreList).required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

contactSchema.post("save", handleMongooseError); // при каждом успешном сохранении документа в коллекции, handleMongooseError будет вызываться для обработки ошибок, если они возникнут.

const Contact = model("contact", contactSchema); // класс который будет работаь с колеекцией. вместо json файла с номерами теперь будет он

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
