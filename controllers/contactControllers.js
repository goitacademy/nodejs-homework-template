const Contact = require("../models/contactModels");

async function listContacts(req, res, next) {
  console.log({user: req.user});

  try {
    const contacts = await Contact.find({owner: req.user.id}).exec();

    // console.log(contacts);
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

    if (contact.owner.toString() !== req.user.id){
      return res.status(403).send("Forbidden contact")
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
    favorite: req.body.favorite,
    owner: req.user.id,
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
  const { name, email, phone, favorite } = req.body;

  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).send("Contact Not Found");
    }

    if (contact.owner.toString() !== req.user.id) {
      return res.status(403).json('Forbidden to update');
    }
    // Оновлюємо всі поля контакту
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.favorite = favorite;

    const updatedContact = await contact.save();
    
    res.json({ message: 'Contact Updated successfully', data: updatedContact });

  } catch (err) {
    next(err);
  }  
}

async function removeContact(req, res, next) {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findById(contactId);

    // console.log(contact); 

    if (!contact) {
      return res.status(404).json({ error: 'Contact Not Found', message: 'Contact not found with the given ID' });
    }

    if (contact.owner.toString() !== req.user.id) {
      return res.status(403).json('Forbidden');
    }

    const result = await contact.deleteOne();
    res.json({ message: 'Contact deleted successfully', data: result });
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
