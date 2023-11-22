const Contact = require("../models/contact");

const { contactSchema, favoriteSchema } = require("../routes/schemas/contactSchema");

async function listContacts(req, res, next) {
  const { _id: owner } = req.user;
  const { page = 1, limit, favorite } = req.query;
  const skip = (page - 1) * limit;
  try {
    console.log({ favorite });

    if (favorite === undefined) {
      const contacts = await Contact.find({ owner }, "", {
        skip,
        limit,
      }).exec();

      return res.json(contacts);
    }

    const contacts = await Contact.find({ favorite, owner }, "", {
      skip,
      limit,
    }).exec();

    res.json(contacts);
  } catch (err) {
    next(err);
  }
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findById(contactId).exec();

    if (contact === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(contact);
  } catch (err) {
    next(err);
  }
}

async function removeContact(req, res, next) {
  const { contactId } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (deletedContact === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Contact deleted" });
  } catch (err) {
    next(err);
  }
}

async function addContact(req, res, next) {
  const body = contactSchema.validate(req.body);
  const contactBody = body.value;

  if (typeof body.error !== "undefined") {
    return res.status(400).json({
      message: body.error.details.map((err) => err.message).join(", "),
    });
  }

  const { _id: owner } = req.user;

  try {
    const newContact = await Contact.create({ ...contactBody, owner });
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const body = contactSchema.validate(req.body);
  const contactBody = body.value;

  if (typeof body.error !== "undefined") {
    return res.status(400).json({
      message: body.error.details.map((err) => err.message).join(", "),
    });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      contactBody,
      { new: true }
    );

    if (updatedContact === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
}

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;
  const body = favoriteSchema.validate(req.body);
  const contactBody = body.value;

  if (typeof body.error !== "undefined") {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  try {
    const switchFavorite = await Contact.findByIdAndUpdate(
      contactId,
      contactBody,
      { new: true }
    );

    if (switchFavorite === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(switchFavorite);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};