const { Contact }  = require("./contactsSchema");

async function listContacts(req, res, next) {
  try {
    const getContacts = await Contact.find().exec();
    res.send(getContacts);
  } catch (error) {
    next(error);
  }
}

async function getContactById (req, res, next) {
  const {contactId} = req.params
  try {
    const contact = await Contact.findById(contactId).exec();

    if (contact === null ) {
      return res.status(404).send("Contact not found:(");
    }

    res.send(contact);
  } catch (error) {
    next(error)
  }
}

async function removeContact (req, res, next) {
  const {contactId} = req.params
  try {
    const result = await Contact.findByIdAndDelete(contactId);

    if (result === null) {
      return res.status(404).send("Contact not found:(");
    }

    res.send("Contact delete");
  } catch (error) {
    next(error)
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
  const result = await Contact.create(contact);

  res.status(201).send(result);
  } catch (err) {
    next(err);
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
    const result = await Contact.findByIdAndUpdate(contactId, contact, { new: true });

    if (result === null) {
      return res.status(404).send("Contact not found");
    }

    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function updateFavorite(req, res, next) {
  const { contactId } = req.params;

  if (req.body.favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const result = await updateStatusContact(contactId, { favorite: req.body.favorite });

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function updateStatusContact(contactId, data) {
 try {
  const result = await Contact.findByIdAndUpdate(contactId, data, { new: true });
  return result;
 } catch (error) {
  console.log(error)
 }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
  updateStatusContact,
}
