// Підключаємо моделс для роботи mongoose з колекцією mongoDB
// const contacts = require("../models/contacts");
const Contact = require("../models/contacts");
// валідація
const { contactSchema, patchSchema } = require("../schemas/contacts");

// функції controllers для контактів
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user.id }).exec();
    res.send(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const hexIdPattern = /^[0-9a-fA-F]{24}$/;

  try {
    if (!hexIdPattern.test(id)) {
      return res.status(400).json({ message: "not valid id" });
    }

    const contact = await Contact.findById(id).exec();
    if (contact === null) {
      return res.status(404).send({ message: "Contact not found" });
    }

    if (contact.owner.toString() !== req.user.id.toString()) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.send(contact);
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    owner: req.user.id,
  };

  try {
    const validation = contactSchema.validate(contact);
    if (validation.error) {
      const errorMessage = validation.error.details
        .map((error) => error.message)
        .join(", ");
      return res.status(400).send(`Validation Error: ${errorMessage}`);
    }

    const result = await Contact.create(contact);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

const putContact = async (req, res, next) => {
  const { id } = req.params;
  const hexIdPattern = /^[0-9a-fA-F]{24}$/;

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  try {
    if (!hexIdPattern.test(id)) {
      return res.status(400).json({ message: "not valid id" });
    }
    const validation = contactSchema.validate(contact);
    if (validation.error) {
      const errorMessage = validation.error.details
        .map((error) => error.message)
        .join(", ");
      return res.status(400).send(`Validation Error: ${errorMessage}`);
    }

    // перевірити чи id юзеру === owner контакта
    const ownContact = await Contact.findById(id);

    // res.send(ownContact)
    if (ownContact.owner.toString() !== req.user.id.toString()) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const result = await Contact.findByIdAndUpdate(id, contact, { new: true });
    if (result === null) {
      return res.status(404).send({ message: "Contact not found" });
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const hexIdPattern = /^[0-9a-fA-F]{24}$/;

  try {
    if (!hexIdPattern.test(id)) {
      return res.status(400).json({ message: "not valid id" });
    }

    // перевірити чи id юзеру === owner контакта
    const contact = await Contact.findById(id);

    if (contact.owner.toString() !== req.user.id.toString()) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const result = await Contact.findByIdAndDelete(id);

    res.send(result);
  } catch (error) {
    next(error);
  }
};

const patchContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const hexIdPattern = /^[0-9a-fA-F]{24}$/;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const validation = patchSchema.validate(
      { favorite },
      { abortEarly: false }
    );
    if (validation.error) {
      const errorMessage = validation.error.details
        .map((error) => error.message)
        .join(", ");
      return res.status(400).send(`Validation Error: ${errorMessage}`);
    }
    if (!hexIdPattern.test(id)) {
      return res.status(400).json({ message: "not valid id" });
    }

    // перевірити чи id юзеру === owner контакта
    const ownContact = await Contact.findById(id);
    if (ownContact.owner.toString() !== req.user.id.toString()) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const results = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    if (results === null) {
      return res.status(404).json({ message: " Not found " });
    }
    res.send(results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  postContact,
  putContact,
  deleteContact,
  patchContact,
};
