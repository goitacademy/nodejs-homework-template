const Contacts = require("../repository/contacts");

const getContacts = async (req, res, next) => {
  try {
    // console.log(req.method);
    // console.log(req);

    const userId = req.user._id;
    const contacts = await Contacts.listContacts(userId);
    res.json({ status: "success", cod: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.updateContact(req.params.contactId, userId);
    // console.log(req.params);

    console.log(contact);
    console.log(contact.id);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", cod: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", cod: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });
    res.status(201).json({ status: "success", cod: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.removeContact(req.params.contactId, userId);
    if (contact) {
      return res.status(200).json({
        status: "success",
        cod: 200,
        message: "contact deleted",
        data: { contact },
      });
    }
    return res
      .status(404)
      .json({ status: "error", cod: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId
    );
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", cod: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", cod: 404, message: "missing fields" });
  } catch (error) {
    next(error);
  }
};

const updateStatusFavoriteContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId
    );
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", cod: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", cod: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusFavoriteContact,
};
