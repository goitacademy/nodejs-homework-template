const Contacts = require("../model/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const userId = await req.user?.id;
    const contacts = await Contacts.listContacts(userId, req.query);
    return res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = await req.user?.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 201,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const createContact = async (req, res, next) => {
  const userId = await req.user?.id;
  const contact = await Contacts.addContact(userId, req.body);
  return res.status(201).json({
    status: "success",
    code: 201,
    data: { contact },
  });
};

const deleteContact = async (req, res, next) => {
  try {
    const userId = await req.user?.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 201,
        message: "Contact deleted",
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const userId = await req.user?.id;
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const patchContactById = async (req, res, next) => {
  try {
    const userId = await req.user?.id;
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    );

    if (contact) {
      return res.json({
        status: "success",
        code: 201,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContactById,
  patchContactById,
};
