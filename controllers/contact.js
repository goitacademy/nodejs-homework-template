const Contact = require("../models/contact");

const { contactSchema, favoriteSchema } = require("../routes/shemas/contactSchema");

async function listContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();
  
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
    console.log(body.error);
    return res.status(400).json({
      message: body.error.details.map((err) => err.message).join(", "),
    });
  }

  try {
    const newContact = await Contact.create(contactBody);
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

  // if (typeof body.error !== "undefined") {
  //   return res.status(400).json({ message: "Missing field favorite" });
  // }
  if (body.error) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  try {
    const switchFavorite = await Contact.findByIdAndUpdate(
      contactId,
      contactBody,
      { new: true });

    if (switchFavorite === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(switchFavorite);}
  // try {
  //   const updatedContact = await Contact.findByIdAndUpdate(
  //     contactId,
  //     { favorite: contactBody.favorite },
  //     { new: true }
  //   );

  //   if (updatedContact === null) {
  //     return res.status(404).json({ message: "Not found" });
  //   }

  //   res.json(updatedContact);}

  catch (err) {
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