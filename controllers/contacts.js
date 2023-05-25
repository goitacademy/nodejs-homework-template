const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

// ---------------------------   G E T -----------------------------------------

// const getContacts = async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json(result);
//   } catch (error) {
//     // res.status(500).json({ message: "Server error" });
//     next(error);
//   }
// };

const getContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

// ----------------------------- GET  BY  ID------------------------------------------

// const getById = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;

//     const result = await contacts.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//       // const error = new Error("Not found!");
//       // error.status = 404;
//       // throw error;
//       // return res.status(404).json({ message: "Not found!" });
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//     // const {status = 500, message = "Server error"} = error;
//     // res.status(status).json({message,})
//   }
// };

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
    // const error = new Error("Not found!");
    // error.status = 404;
    // throw error;
    // return res.status(404).json({ message: "Not found!" });
  }
  res.json(result);
};

// -----------------------   P O S T   ------------------------------------------

// const createNewContact = async (req, res, next) => {
//   try {
//     // console.log(req.body);
//     const { error } = addSchema.validate(req.body);
//     if (error) throw HttpError(400, error.message);

//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
const createNewContact = async (req, res, next) => {
  // console.log(req.body);
  //   const { error } = addSchema.validate(req.body);
  //   if (error) throw HttpError(400, error.message);

  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};
// --------------------------  D E L E T E  ------------------------------------------

// const deleteContact = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     // console.log(contactId);
//     const result = await contacts.removeContact(contactId);
//     if (!result) throw HttpError(404, "Not found");
//     // console.log(result);
//     res.json({ message: "Delete success" });
//   } catch (error) {
//     next(error);
//   }
// };

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contacts.removeContact(contactId);
  if (!result) throw HttpError(404, "Not found");

  res.json({ message: "Delete success" });
};
// ---------------------------  P U T  ------------------------------------------

// const changeContact = async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) throw HttpError(400, error.message);
//     const { contactId } = req.params;
//     // console.log("id", contactId);
//     const result = await contacts.updateContact(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     // console.log("req.body", req.body);
//     // console.log("result", result);
//     res.json(result);
//   } catch (error) {}
// };

const changeContact = async (req, res, next) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) throw HttpError(400, error.message);
  const { contactId } = req.params;
  // console.log("id", contactId);
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  // console.log("req.body", req.body);
  // console.log("result", result);
  res.json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getById: ctrlWrapper(getById),
  createNewContact: ctrlWrapper(createNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  changeContact: ctrlWrapper(changeContact),
};
