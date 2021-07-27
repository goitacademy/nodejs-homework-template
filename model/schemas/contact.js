const { Schema } = require('mongoose');
const Joi = require('joi');

const schemaContact = Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Имя должно содержать более 2х символов'],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Пожалуйста введите валидный адресс',
      ],
    },
    phone: {
      type: String,
      unique: true,
      required: true,
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const contactValidate = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .min(10)
    .max(14)
    .required(),
});
const сontactValidateByFavorite = contactForUpdate => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  const { error } = schema.validate(contactForUpdate);
  return error;
};

module.exports = { schemaContact, contactValidate, сontactValidateByFavorite };
