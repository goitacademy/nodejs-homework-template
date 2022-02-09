// направить правильно запрос юзера на правильную бизнес логику

const {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  patchContact,
  deleteContactById,
} = require("../services/contactsService");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;

    const contact = await getContactById(id);
    res.json(contact);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404;
    }

    next(error);
  }
};

const addContactController = async (req, res, next) => {
  try {
    const { body } = req;

    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }

    next(error);
  }
};

const changeContactController = async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId: id } = req.params;

    const updateContact = await changeContactById(id, body, {
      new: true,
    });
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
};

const patchContactController = async (req, res, next) => {
  try {
    // const { body } = req;
    const { contactId: id } = req.params;
    const { favorite } = req.body;

    const updateContact = await patchContact(
      id,
      { favorite },
      {
        new: true,
      }
    );
    res.json(updateContact);
  } catch (error) {
    if (error.message.includes("missing field favorite")) {
      error.status = 400;
    }

    next(error);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;

    await deleteContactById(id);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  patchContactController,
  deleteContactController,
};
