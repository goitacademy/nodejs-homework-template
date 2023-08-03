const Contact = require('../service/schemas/contacts');

const listContacts = async (req, res) => {
 try {
   const contacts = await Contact.find();
    res.json(contacts); 
 } catch (error) {
   console.error(error.message);
   res.status(404).json({ error: "Error!" });
 }
}

const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const foundContact =  await Contact.findOne({ _id: contactId});

    if (foundContact) {
      res.send(foundContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
    
  }
  catch (error) {
    console.error(error.message)
  }
};

const addContact = async (req, res) => {
 try {
   const contact = req.body;
   await Contact.create({ ...contact });
   res.status(201).json(`contact with name:${contact.name} add to data base!`);
 } catch (error) {
   console.error(error.message);
   res.status(500).json({ message: "Failed to add contact to the database." });
 }
}

const removeContact = async (req, res) => {
  const contacts = await Contact.find();
  const { contactId } = req.params;

  if (contacts.some((contact) => contact.id === contactId)) {
    await Contact.findByIdAndRemove({ _id: contactId });
    res.status(200).send({message: "contact deleted"});
  }
  else {
    res.status(404).send({ message: "Not found" });
  }
};

const updateContact = async (req, res) => {
   const { contactId } = req.params;
   const contact = req.body;
  
  if (contact.name && contact.phone && contact.email) {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        { $set: contact }, 
        { new: true }
      );
      res.send(updatedContact);
    } catch (error) {
      res.status(404).json({ message: "Contact not found" });
    }
  } else {
    res.status(400).json({ message: "Missing fields" });
  }
};

const updateStatusContact = async (req, res) => {
   const { contactId } = req.params;
   const { favorite = true} = req.body;
   const contact = req.body;

  if (favorite === undefined) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: contact, favorite },
      { new: true }
    );
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
}
