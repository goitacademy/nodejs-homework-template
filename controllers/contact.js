const Contact = require("../models/contact");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();
    console.log(contacts);
    res.send(contacts);
  } catch (err) {
    next(err);
  }
}
async function getContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId).exec();
    if (contact === null) {
      return res.status(404).send("Contact not found");
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
}

async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: Boolean(req.body.favorite),
  };
  try {
    const result = await Contact.create(contact);
    console.log(result);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: Boolean(req.body.favorite),
  };
  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });
    if (result === null) {
      return res.status(404).send("Contact not found");
    }
    console.log(result);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(contactId);
    if (result === null) {
      return res.status(404).send("Contact not found");
    }
    res.send({ contactId });
  } catch (err) {
    next(err);
  }
}

async function updateStatusContact(req, res) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  // Check if favorite field is provided in the request body
  if (favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  try {
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};
