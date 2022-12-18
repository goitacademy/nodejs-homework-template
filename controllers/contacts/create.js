const { createError } = require("../../helpers");
const { addContact } = require("../../models/contactModel/contacts");
const {
  CONTACT_ALLREADY_EXIST,
  CONTACT_ADDED,
} = require("./contactsConstants");
// const { contactSchema } = require("../../helpers");

async function createContact(req, res, next) {
  const result = await addContact(req.body);

  console.log(result);
  if (result === "exist") {
    throw createError({ status: 400, message: CONTACT_ALLREADY_EXIST });
  }
  res.status(201).json({
    data: result,
    message: CONTACT_ADDED,
  });
}
module.exports = createContact;
