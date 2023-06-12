const wrapper = require("../utils/wrapper");
const errHttp = require("../utils/errHttp");
const {
  addContact,
  listContacts,
  getContactById,
  removeContact,
  updateContact,
} = require("../models/contacts");

/** Add */

const add = async (req, res) => {
  const data = await listContacts();
  const result = await addContact(req.body);

  if (data.some((contact) => contact.phone === result.phone)) {
    throw errHttp(400, "already have this contact!!");
  } else {
    res.status(201).json(result);
  }
};

/** Get */

const getAll = async (req, res) => {
  const result = await listContacts();

  res.json(result);
};

/** GetByID */

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);

  if (!result) {
    throw errHttp(404, "Not found");
  }

  res.json(result);
};

/** RemoveByID */

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (!result) {
    throw errHttp(404, "Not found");
  }

  res.json({ message: "Contact deleted" });
};

/** UpdateByID */

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    throw errHttp(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  add: wrapper(add),
  getAll: wrapper(getAll),
  getById: wrapper(getById),
  removeById: wrapper(removeById),
  updateById: wrapper(updateById),
};
