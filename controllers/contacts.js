const HttpError = require('../httpErrors/errors')
const { Contact } = require('../models/contactsSchema');

async function listContacts(_, res, next) {
  try {
    const getContacts = await Contact.find().exec();
    res.send(getContacts);
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId).exec();

    if (!contact) {
      throw HttpError(404, `Contact with ID ${contactId} not found`);
    }

    res.send(contact);
  } catch (error) {
    if (error.name === 'CastError') {
      return res
        .status(404)
        .json({ message: `Contact with ID ${contactId} not found` });
    }
    next(error);
  }
}

async function removeContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndDelete(contactId);

    if (result === null) {
      return res.status(404).send(`Contact with ID ${contactId} not found`);
    }

    res.send('Contact deleted');
  } catch (error) {
    if (error.name === 'CastError') {
      return res
        .status(404)
        .json({ message: `Contact with ID ${contactId} not found` });
    }
    next(error);
  }
}

async function addContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  try {
    const newContact = await Contact.create(contact);

    res.status(201).send(newContact);
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });

    if (result === null) {
      return res.status(404).send(`Contact with ID ${contactId} not found`);
    }

    res.send(result);
  } catch (err) {
    if (err.name === 'CastError') {
      return res
        .status(404)
        .json({ message: `Contact with ID ${contactId} not found` });
    }
    next(err);
  }
}

async function addToFavorites(req, res, next) {
  const { contactId } = req.params;

  if (req.body.favorite === undefined || req.body.favorite === null) {
    return res
      .status(400)
      .json({ message: 'missing or invalid "favorite" field' });
  }

  try {
    const result = await updateStatusContact(contactId, {
      favorite: req.body.favorite,
    });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(result);
  } catch (error) {
    if (error.name === 'CastError') {
      return res
        .status(404)
        .json({ message: `Contact with ID ${contactId} not found` });
    }
    next(error);
  }
}

async function updateStatusContact(contactId, data) {
  try {
    const result = await Contact.findByIdAndUpdate(contactId, data, {
      new: true,
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  addToFavorites,
  updateStatusContact,
};
