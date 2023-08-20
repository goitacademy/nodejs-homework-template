const Contact = require("../models/contact"); // імпорт функції для роботи з бекендом

const { HttpError, ctrlWrapper } = require("../helpers"); // імпортуємо функцію генерації та виводу помилки

// отритмання всіх контактів
// у req.query зберігаються всі параметри пошуку
const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query; // (для пагинації)отримуємо значення параметрів page та limit
  const skip = (page - 1) * limit; // Обчислення значення пропуску для операції пошуку
  const result = await Contact.find({ owner }, "", { skip, limit }).populate(
    "owner",
    "email"
  );

  res.json(result);
};

// отримання контакту по id
const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId); // використовуємо для пошуку по id

  // обробляємо помилку якщо контакт не існує
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

// додавання контакту
const addContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

// видалення контакту
const removeContacts = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Сontact deleted" });
};

// внесення змін до контакту
const updateContact = async (req, res) => {
  // console.log("updateContact-terminal");
  const { contactId } = req.params;
  // console.log("contactIdUpdate - ", contactId);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  // console.log("result-updateContact - ", result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// оновлення поля favorite
const updateStatusContact = async (req, res) => {
  // console.log("updateStatusContact-terminal");
  const { contactId } = req.params;
  // console.log("contactIdFavorite - ", contactId);

  const { favorite } = req.body;
  // console.log("favorite - ", favorite);

  if (favorite === undefined) {
    throw HttpError(400, "missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  // console.log("result-updateStatusContact - ", result);
  if (!result) {
    throw HttpError(404, `Contact with id= ${contactId} not found`);
  }
  res.json(result);
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  addContacts: ctrlWrapper(addContacts),
  removeContacts: ctrlWrapper(removeContacts),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
