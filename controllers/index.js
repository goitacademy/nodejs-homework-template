const { Contact, validateContact } = require("../service/schemas/contactSchema");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();
    res.send(contacts);
  } catch (err) {
    next(err);
  }
}

async function getContact(req, res, next) {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id).exec();

    if (contact === null) {
      return res.status(404).send("Contact not found:(");
    }

    res.send(contact);
  } catch (err) {
    next(err);
  }
}

async function createContact(req, res, next) {
  try {
    const { error } = validateContact(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  const { id } = req.params;

  try {
    const { error } = validateContact(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(id);

    if (result === null) {
      return res.status(404).send("Contact not found");
    }

    res.send({ id });
  } catch (err) {
    next(err);
  }
}

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    if (favorite === undefined) {
      return res.status(400).json({ message: 'missing field favorite' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};
