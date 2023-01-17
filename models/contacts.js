const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavoriteStatus,
} = require("../services/contacts");

const getContacts = async (req, res, next) => {
  const contacts = await listContacts({ ...req.query, owner: req.user._id });
  res.set("Content-Type", "application/json").send(contacts);
};

const getById = async (req, res, next) => {
  const searchFilters = {
    _id: req.params.contactId,
    owner: req.user._id,
  };

  try {
    const contact = await getContactById(searchFilters);

    if (!contact) {
      res.status(404).json({ message: "Not found" }).end();
      return;
    }

    res.json(contact);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const newContact = await addContact({
      ...req.body,
      owner: req.user._id,
    });
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  const contactChanges = req.body;
  const searchFilters = {
    _id: req.params.contactId,
    owner: req.user._id,
  };

  try {
    const updatedContact = await updateContact(searchFilters, contactChanges);

    updatedContact
      ? res.status(200).json(updatedContact)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  const searchFilters = {
    _id: req.params.contactId,
    owner: req.user._id,
  };

  try {
    const isContactExist = await removeContact(searchFilters);

    isContactExist
      ? res.status(200).json({ message: "Contact deleted" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const setFavorite = async (req, res, next) => {
  const searchFilters = {
    _id: req.params.contactId,
    owner: req.user._id,
  };

  try {
    const updatedContact = await updateFavoriteStatus(searchFilters, req.body);

    updatedContact
      ? res.status(200).json(updatedContact)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getContacts,
  getById,
  updateContactById,
  createContact,
  deleteContactById,
  setFavorite,
};
