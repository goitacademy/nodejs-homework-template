const Contact = require("../models/contactModel");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();
    res.send(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id).exec();
    if (contact === null) {
      return res.status(404).send("Contact not found");
    }
    console.log(contact);
    res.send(contact);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  try {
    const result = await Contact.create(contact);
    res.send(result);
  } catch (error) {
    next(error);
  }
}
//upd fix
async function updateContact(req, res, next) {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  if (
    contact.name === undefined ||
    contact.email === undefined ||
    contact.phone === undefined
  ) {
    return res.status(400).json({ message: "missing some field" });
  }
  try {
    const result = await Contact.findByIdAndUpdate(id, contact, {
      new: true,
    });
    if (result === null) {
      return res.status(404).send("contact not found");
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  const { id } = req.params;
  try {
    const result = await Contact.findByIdAndDelete(id);
    if (result === null) {
      return res.status(404).send("contact not found");
    }
    res.send(id);
  } catch (error) {
    next(error);
  }
}

async function updateStatusContact(req, res, next) {
  const { id } = req.params;
  const { favorite } = req.body;
  try {
    if (favorite === undefined) {
      return res.status(400).json({ message: "missing field 'favorite'" });
    }
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );

    if (result === null) {
      return res.status(404).send("contact not found");
    }
    res.send(result);
  } catch (error) {
    next(error);
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
