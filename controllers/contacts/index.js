const {
  fetchContacts,
  fetchContact,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require("./helpers");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await fetchContacts();
    return res.json(contacts);
  } catch (err) {
    return next(err);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await fetchContact(req.params.id);
    if (contact) {
      return res.json(contact);
    } else {
      return next();
    }
  } catch (err) {
    return next(err);
  }
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await addContact({ name, email, phone });
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
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
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const result = await updateStatusContact(id, favorite);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    } else {
      return res.status(200).json(result);
    }
  } catch (err) {
    return next(err);
  }
};

const putContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateContact({ id, toUpdate: req.body, upsert: true });
    return res.json(result);
  } catch (err) {
    return next(err);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    await removeContact(id);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

module.exports = { getAllContacts, getContact, createContact, updateFavorite, putContact, deleteContact };
