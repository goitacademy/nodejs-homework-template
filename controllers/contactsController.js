const path = require("path");

const contactsFuncPath = path.resolve("models/contacts.js");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require(contactsFuncPath);

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    console.log("contacts: ", contacts);

    res.status(200).json({
      status: "success",
      code: "200",
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contactById = await getContactById(contactId);

    if (!contactById) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({
      status: "success",
      code: "200",
      data: {
        contactById,
      },
    });
  } catch (error) {
    next(error);
  }
};

const postNewContactController = async (req, res, next) => {
  try {
    const { body } = req;

    await addContact(body);

    res.status(201).json({
      message: `New contact has been created!`,
      status: "success",
      code: "201",
    });
  } catch (error) {
    next(error);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await removeContact(contactId);

    res.status(200).json({
      message: `Contact with id:${contactId} has been removed!`,
      status: "success",
      code: "200",
    });
  } catch (error) {
    next(error);
  }
};

const putContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;

    if (!contactId) {
      return res.status(400).json({ message: "missing id" });
    }

    await updateContact(contactId, body);

    res.status(200).json({
      message: `Contact with id:${contactId} has been updated!`,
      status: "success",
      code: "200",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  postNewContactController,
  deleteContactController,
  putContactController,
};
