const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const middleware = require("./middleware");

const tryCatchWrapper = async (handler, req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    middleware.handleNotFoundError(res);
  }
};

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  tryCatchWrapper(
    async () => {
      const contact = await getById(req.params.id);
      res
        .status(contact ? 200 : 404)
        .json(contact || middleware.handleNotFoundError(res));
    },
    req,
    res
  );
};

const createContact = async (req, res) => {
  tryCatchWrapper(
    async () => {
      await middleware.validateContact(req, res, async () => {
        const newContact = await addContact(req.body);
        res.status(201).json(newContact);
      });
    },
    req,
    res
  );
};

const deleteContact = async (req, res) => {
  tryCatchWrapper(
    async () => {
      const result = await removeContact(req.params.id);
      res.status(result.message === "contact deleted" ? 200 : 404).json(result);
    },
    req,
    res
  );
};

const updateContactInfo = async (req, res) => {
  tryCatchWrapper(
    async () => {
      const updatedContact = await updateContact(req.params.id, req.body);
      res.status(200).json(updatedContact);
    },
    req,
    res
  );
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContactInfo,
};
