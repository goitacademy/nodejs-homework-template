const Contact = require("../models/contact");

async function listContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();

    console.log(contacts);
    res.send(contacts);
  } catch (err) {
    next(err);
  }
}

async function getContactById(req, res, next) {
  const {contactId} = req.params;
  try {
    console.log(`Searching for contact with id: ${contactId}`);
    const contact = await Contact.findById(contactId).exec();
   
    console.log(contact);
    if (contact === null) {
      return res.status(404).send("Contact not found");
    }
    console.log(`Found contact: ${contact}`);
    res.send(contact);
  } catch (err) {
    console.error(err)
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
  const { contactId } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite
  }
  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {new: true}); 
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
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(contactId);
    if (result === null) {
      return res.status(404).send("Contact Not Found");
    }
    res.json({ message: 'Contact deleted successfully', data: result });
    // res.send(`Deleted book ${contactId})`);
  } catch (err) {
    next(err);
  }
}

async function updateStatusOfContact(req, res, next) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).send('favorite field missing' );
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: true },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).send('Not found');
    }
    res.status(200).send(updatedContact);
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
  updateStatusOfContact,
};
