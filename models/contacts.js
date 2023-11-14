const { Contact } = require('./schema');

async function listContacts(_, res, next) {
  // Повертає масив контактів.
  try {
    const getContacts = await Contact.find().exec();
    res.send(getContacts);
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId).exec();

    if (contact === null) {
      return res.status(404).send('Contact not found');
    }

    res.send(contact);
  } catch (error) {
    next(error);
  }
}

async function removeContact(req, res, next) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const { contactId } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(contactId);

    if (contact === null) {
      return res.status(404).send('Contact not found');
    }

    res.send('Contact deleted');
  } catch (error) {
    next(error);
  }
}

async function addContact(req, res, next) {
  // Повертає об'єкт доданого контакту.
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
  // Повертає оновлений об'єкт контакту.
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
      return res.status(404).send('Contact not found');
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
}

async function addToFavorites(req, res, next) {
  // В обраному чи ні знаходиться зазначений контакт.
  const { contactId } = req.params;

  if (req.body.favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  try {
    const result = await updateStatusContact(contactId, {
      favorite: req.body.favorite,
    });

    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function updateStatusContact(contactId, data) {
  // Поновлення контакту в базі.
  try {
    const result = await Contact.findByIdAndUpdate(contactId, data, {
      new: true,
    });
    return result;
  } catch (error) {
    console.log(error);
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