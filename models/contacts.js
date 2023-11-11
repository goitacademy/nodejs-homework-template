const mongoose = require("mongoose");
const Contact = require("../Schema/schema");
const BASE_URL = process.env.DATABASE_URI;

mongoose
  .connect(BASE_URL)
  .then(() => console.info("Database connection successful"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function listContacts(req, res, next) {
  try {
    console.log("Before Contact.find()");
    const contacts = await Contact.find().exec();
    console.log("After Contact.find()");
    res.send(contacts);
  } catch (error) {
    console.error("Error in listContacts:", error);
    next(error);
  }
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId).exec();
    console.log(contact);

    if (contact === null || contact === undefined) {
      return res.status(404).send({ message: "Not found" });
    }

    res.send(contact);
  } catch (error) {
    next(error);
  }
}

async function addContact(req, res, next) {
  console.log("Handling POST /api/contacts request...");
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  try {
    const createContact = await Contact.create(contact);
    console.log("Contact created:", createContact);
    res.status(201).send(createContact);
  } catch (error) {
    console.error("Error creating contact:", error);
    next(error);
  }
}

async function removeContact(req, res, next) {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndRemove(contactId);

    if (result === null) {
      return res.status(404).send({ message: "Not found" });
    }

    res.status(200).send({ message: "contact deleted" });
    res.send({ contactId });
  } catch (error) {
    next(error);
  }
}

// Update Contact
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
    console.log(result);
    res.end();
  } catch (error) {
    next(error);
  }
}

async function statusContact(req, res, next) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: favorite },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  statusContact,
};
