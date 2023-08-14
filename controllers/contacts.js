const Contact = require("../models/contact"); // імпорт функції для роботи з бекендом

const { HttpError, ctrlWrapper } = require("../helpers"); // імпортуємо функцію генерації та виводу помилки

// отритмання всіх контактів
const getListContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// отримання контакту по id
const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId); // використовують для пошуку по id

  // обробляємо помилку якщо контакт не існує
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

// додавання контакту
const addContacts = async (req, res, next) => {
  const result = await Contact.create(req.body);

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
  console.log("updateContact-terminal");
  const { contactId } = req.params;
  console.log("contactIdUpdate - ", contactId);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  console.log("result-updateContact - ", result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// оновлення поля favorite
const updateStatusContact = async (req, res) => {
  console.log("updateStatusContact-terminal");
  const { contactId } = req.params;
  console.log("contactIdFavorite - ", contactId);

  const { favorite } = req.body;
  console.log("favorite - ", favorite);

  if (favorite === undefined) {
    throw HttpError(400, "missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  console.log("result-updateStatusContact - ", result);
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
