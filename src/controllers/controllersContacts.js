const Contacts = require("../../repository");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
        message: `Contact with id ${req.params.contactId} found!`,
      });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id ${req.params.contactId} not found!`,
    });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact },
      message: `Contact with name ${req.body.name} added successfully!`,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
        message: `Contact with name ${contact.name} updated!`,
      });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id ${req.params.contactId} not found!`,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
        message: `Status contact with name ${req.body.name} updated!`,
      });
    }
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id ${req.params.contactId} not found!`,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
        message: `Contact with id ${req.params.contactId} removed!`,
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id ${req.params.contactId} not found!`,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
