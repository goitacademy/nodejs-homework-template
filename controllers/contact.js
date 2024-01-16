const Contact = require("../models/contact");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find({});

    res.send(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);

    if (contact === null) {
      return res.status(404).send("Contact not found");
    }

    res.send(contact);
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  // Add Joi before

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
    
  };

  try {
    const result = await Contact.create(contact);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  const { id } = req.params;

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
    
  };

  try {
    const result = await Contact.findByIdAndUpdate(id, contact, { new: true });

    if (result === null) {
      return res.status(404).send("Contact not found");
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
      return res.status(404).send("Contact not found");
    }

    res.send({ id });
  } catch (error) {
    next(error);
  }
}

async function changeContactFavorite(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndUpdate(
      id,
      {
        favorite: req.body.favorite,
      },
      { new: true }
    );

    if (result === null) {
      return res.status(404).send("Contact not found");
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
  changeContactFavorite,
};