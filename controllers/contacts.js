const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers"); // імпортуємо функцію генерації та виводу помилки

// отритмання всіх контактів
const getListContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

// отримання контакту по id
const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  // обробляємо помилку якщо контакт не існує
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

// додавання контакту
// для додавання необхідно прочитати тіло запиту, яке зберігається у req.body
// робимо валідацію за домогою бібліотеки joi. У addSchema викликаємо метод validate та передаємо об'єкт який необхідно перевірити, тобто перевіряємо тіло body(об'єкт post-запиту на додавання контакту) на наявність всіх полів та їх відповідність вимогам у addSchema
const addContacts = async (req, res, next) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

// видалення контакту
const removeContacts = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Сontact deleted" });
};

// внесення змін до контакту
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  addContacts: ctrlWrapper(addContacts),
  removeContacts: ctrlWrapper(removeContacts),
  updateContact: ctrlWrapper(updateContact),
};
