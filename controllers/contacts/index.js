const { fetchContacts, fetchContact, addContact, updateContact, removeContact } = require("./helpers");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await fetchContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await fetchContact(req.params.id);
    if (contact) {
      res.json(contact);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await addContact({ name, email, phone });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// const patchContact = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const result = await updateContact({ id, toUpdate: req.body });
//     if (!result) {
//       next();
//     } else {
//       res.json(result);
//     }
//   } catch (err) {
//     next(err);
//   }
// };

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const result = await updateStatusContact(contactId, favorite);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

const putContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateContact({ id, toUpdate: req.body, upsert: true });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    await removeContact(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllContacts, getContact, createContact, updateFavorite, putContact, deleteContact };
