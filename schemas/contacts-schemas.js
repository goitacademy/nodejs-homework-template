import Joi from "joi";

// схема валідації контакту  - створюємо для цього джоі схему (опис як повинен виглядати об'єкт) на додавання контакту
export const movieAddSchema = Joi.object({
  // id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(), //можно далі ще текст помилки (месседж) додати, який буде потім повертатися
});

export const movieUpdateSchema = Joi.object({
  // id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
});
