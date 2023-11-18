const Contact = require("../models/contact");

async function listContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();

    console.log(contacts);
    res.send(contacts);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function getContactById(req, res, next) {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id).exec();

    // console.log(contact);
    if (contact === null) 
    return res.status(404).send("Contact not found");
    res.send(contact);
  } catch (err) {
    next(err);
  }
}

async function addContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite
  }

  try {
    const result = await Contact.create(contact);

    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
  
}

async function updateContact(req, res, next) {
  const { id } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite
  }
  try {
    const result = await Contact.findByIdAndUpdate(id, contact, {new: true}); 
    // console.log(result);
    if (result === null){
      return res.status(404).send("Contact Not Found");
    }
    res.send(result);

  } catch (err) {
    next(err);
  }

  
}

async function removeContact(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(id);
    if (result === null) {
      return res.status(404).send("Contact Not Found");
    }
    res.send(`Deleted book ${id})`);
  } catch (err) {
    next(err);
  }

  
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
