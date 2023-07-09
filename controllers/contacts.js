const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const result = await Contact.find({});
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  // const result = await Contact.findOne({_id: id});
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// const add = async (req, res, next) => {
//   const result = await Contact.create(req.body);
//   res.status(201).json(result);
// };

async function createContact(req, res, next) {
  try {
    const contact = {
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
    };
    Contact.create(contact);
  } catch (error) {
    return next(error);
  }
}

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// const updateFavorite= async (req, res, next) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// function updateStatusContact(contactId, body) {
//   // Реалізуйте цю функцію відповідно до логіки вашої бази даних або зовнішнього сервісу
//   // Тут ви маєте оновити поле favorite для контакту з contactId відповідно до значення, переданого в body
//   // Поверніть оновлений об'єкт контакту або null, якщо контакт не знайдено
// }

// // Маршрут PATCH /api/contacts/:contactId/favorite
// router.patch('/api/contacts/:contactId/favorite', (req, res) => {
//   const contactId = req.params.contactId;
//   const body = req.body;

//   // Перевірка наявності поля favorite в запиті
//   if (!body || body.favorite === undefined) {
//     return res.status(400).json({ message: 'missing field favorite' });
//   }

//   // Виклик функції для оновлення статусу контакту
//   const updatedContact = updateStatusContact(contactId, body);

//   // Перевірка результату оновлення контакту
//   if (!updatedContact) {
//     return res.status(404).json({ message: 'Not found' });
//   }

//   // Повернення оновленого об'єкту контакту та статусу 200
//   res.status(200).json(updatedContact);
// });

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(createContact),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  // updateFavorite: ctrlWrapper(updateFavorite),
};
