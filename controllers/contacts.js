const Contacts = require("../repositories/contacts");

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { docs: contacts, ...rest } = await Contacts.listContacts(
      userId,
      req.query
    );
    res.json({ status: "success", code: 200, data: { contacts, ...rest } });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);

    if (contact) {
      return res.json({ status: "success", code: 200, data: { contact } });
    }
    return res.json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact(userId, req.body);
    res.status(201).json({ status: "success", code: 201, data: { contact } });
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);

    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: { contact },
      });
    }
    return res.json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    );

    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "contact updated",
        data: { contact },
      });
    }
    return res.json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
