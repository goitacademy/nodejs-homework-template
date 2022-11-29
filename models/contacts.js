const service = require("../services/contactsService");
const getValidation = require("../middlewares/validationMiddlewares");

const listContacts = async (req, res) => {
  const queryHasFavorite = getValidation.getFavoriteContactsValid(req.query);

  if (queryHasFavorite.error) {
    res.status(400).json({ message: queryHasFavorite.error.message });
    return;
  }

  if (
    queryHasFavorite.value.favorite === false ||
    queryHasFavorite.value.favorite
  ) {
    const results = await service.getContactsByFavorite(req.user, req.query);
    res.json(results);
    return;
  }

  const userId = req.user._id;
  try {
    const results = await service.getAllContacts(userId);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const results = await service.getContactById(req.params, req.user);
    if (!results) {
      res.status(404).json({
        message: `Contact with id: '${req.params.contactId}' not found`,
      });
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const removeContact = async (req, res) => {
  try {
    const results = await service.removeContact(req.params, req.user);
    if (!results) {
      res.status(404).json({
        message: `Contact with id: '${req.params.contactId}' not found`,
      });
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addContact = async (req, res) => {
  const bodyIsValid = getValidation.addContactValid(req.body);

  if (bodyIsValid.error) {
    res.status(400).json({ message: bodyIsValid.error.message });
    return;
  }

  try {
    const results = await service.createContact(req.body, req.user);
    res.status(201).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  const bodyIsValid = getValidation.updateContactValid(req.body);

  if (bodyIsValid.error) {
    res.status(400).json({ message: bodyIsValid.error.message });
    return;
  }

  try {
    const results = await service.updateContact(req.params, req.body, req.user);
    if (!results) {
      res.status(404).json({
        message: `Contact with id: '${req.params.contactId}' not found`,
      });
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateStatusContact = async (req, res) => {
  const bodyIsValid = getValidation.updateStatusValid(req.body);

  if (bodyIsValid.error) {
    res.status(400).json({ message: bodyIsValid.error.message });
    return;
  }

  try {
    const results = await service.updateStatusContact(
      req.params,
      req.body,
      req.user
    );
    if (!results) {
      res.status(404).json({
        message: `Contact with id: '${req.params.contactId}' not found`,
      });
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
