const { HttpError } = require("../helpers/index");
const models = require("../models/contacts");

async function getContacts(req, res, next) {
  const { limit } = req.query;
  const contacts = await models.listContacts({ limit });
  return res.json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await models.getContactById(contactId);

  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  return res.json(contact);
}

async function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  console.log("name :", name);

  const newContact = await models.addContact(name, email, phone);
  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await models.getContactById(contactId);
  console.log("contact :", contact);

  if (!contact) {
    return next(HttpError(404, "Not found"));
  }

  await models.removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function changeContact(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;
  const changeContact = await models.updateContact(contactId, body);

  if (!changeContact) {
    return next(HttpError(400, "missing fields"));
  }

  res.status(200).json(changeContact);
}
// router.put("/users/:userId", (req, res) => {
//   const user = getUser(req.params.userId);

//   if (!user) return res.status(404).json({});

//   user.name = req.body.name;
//   res.json(user);
// });

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
};
