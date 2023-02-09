const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../services/contacts');

const controllerGetContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

const controllerGetContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contactById = await getContactById(contactId);
    if (contactById === undefined) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({
      status: 'success',
      code: 200,
      data: { contactById },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

const controllerPostContact = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.json({
      status: 'success',
      code: 201,
      data: { contact },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

const controllerDeleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await removeContact(contactId);
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: { contact },
      });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

const controllerPutContact = async (req, res, next) => {
  const { contactId } = req.params;
  const keys = Object.keys(req.body);

  if (keys.length === 0) {
    res.status(400).json({ message: 'missing fields' });
    return;
  }

  try {
    const contact = await updateContact(contactId, req.body);

    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
};

const controllerPatchFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const contact = await updateStatusContact(contactId, { favorite });
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  controllerGetContacts,
  controllerGetContactById,
  controllerPostContact,
  controllerDeleteContact,
  controllerPutContact,
  controllerPatchFavorite,
};
