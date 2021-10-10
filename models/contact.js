const { Schema, model } = require('mongoose');
const yup = require('yup');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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
      type: Schema.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const yupContactSchema = yup.object({
  name: yup
    .string()
    .required('Обязательное поле')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п.",
    ),
  phone: yup
    .string()
    .required('Обязательное поле')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +',
    ),
  email: yup.string().required('Обязательное поле'),
  favorite: yup.boolean(),
});

const updateFavoriteYupSchema = yup.object({
  favorite: yup.boolean().required(),
});

const Contact = model('contact', contactSchema);

module.exports = {
  yupContactSchema,
  updateFavoriteYupSchema,
  Contact,
};
