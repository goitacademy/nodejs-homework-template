// із ройтес арі переносимо сюди запити
// переносимо сюди функції запиту
// імпортуємо в однині Contact
const { Contact } = require("../models/contacts");
// сюди імпортуємо функцію HttpError i ctrlWrapper
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
    //  оновлення по айді через метод findByIdAndUpdate
    // перший айді другий обєкт оновлення
    // для того щоб він повернув оновлену версію тоді третій аргумент {new: true}
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "Delete success",
  });
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  if (!req.body) throw HttpError(400, "missing field favorite");
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404, "Not found");

  res.status(201).json(result);
};

module.exports = {
    // під час експорту загортаємо в контролер
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
  getById: ctrlWrapper(getById),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};