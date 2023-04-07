// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../models/contacts");

const { Contact } = require("../models/contact");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
  // try {
  //   const result = await Contact.find({}, "-createdAt -updatedAt");
  //   res.json(result);
  // } catch (error) {
  //   next(error);
  // }
};

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
  // try {
  //   const newContact = await Contact.create(req.body);
  //   res.status(201).json(newContact);
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    res.status(400).json({ message: "missing field favorite" });
  }
  res.status(200).json(result);
};

// const getAllContacts = async (req, res, next) => {
//   try {
//     const contacts = await listContacts();
//     res.json(contacts);
//   } catch (error) {
//     next(error);
//   }
// };

// const getById = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const contact = await getContactById(contactId);
//     if (!contact) {
//       res.status(404).json({ message: "Not found" });
//     }
//     res.json(contact);
//   } catch (error) {
//     next(error);
//   }
// };

// const add = async (req, res, next) => {
//   try {
//     const newContact = await addContact(req.body);
//     res.status(201).json(newContact);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// const update = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const updContact = await updateContact(contactId, req.body);
//     if (!updContact) {
//       res.status(404).json({ message: "Not found" });
//     }
//     res.json(updContact);
//   } catch (error) {
//     next(error);
//   }
// };

// const remove = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await removeContact(contactId);
//     if (!result) {
//       res.status(404).json({ message: "Not found" });
//     }
//     res.status(200).json({ message: `contact deleted` });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getAllContacts,
  updateStatusContact,
  // getById,
  add,
  // update,
  // remove,
};
