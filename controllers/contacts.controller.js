// const { createNotFoundHttpError } = require("../helpers");

const { getAllContacts } = require("../service");
// const Contact = require("../service/schemas/contact.schema");

// const {
//   getAllContacts
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../models/contacts");

async function getAllController(req, res, next) {
  const contacts = await getAllContacts();
  console.log(contacts);
  return res.json(contacts);
}

module.exports = {
  getAllController,
  //   create,
  //   deleteById,
  //   updateById,
  //   findOneById,
};
