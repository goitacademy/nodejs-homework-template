const { createError } = require("../../helpers");
const {
  addContact,
  getContactByPhone,
} = require("../../models/contactModel/contacts");
const {
  CONTACT_ALLREADY_EXIST,
  CONTACT_ADDED,
} = require("./contactsConstants");
// const { contactSchema } = require("../../helpers");

async function createContact(req, res, next) {
  const { phone } = req.body;
  const { id } = req.user;

  const foundContact = await getContactByPhone(phone);

  if (foundContact) {
    throw createError({ status: 400, message: CONTACT_ALLREADY_EXIST });
  }

  const result = await addContact({ ...req.body, owner: id });

  res.status(201).json({
    status: 201,
    data: result,
    message: CONTACT_ADDED,
  });
}
module.exports = createContact;
