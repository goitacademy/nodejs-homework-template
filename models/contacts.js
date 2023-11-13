const mongoose = require("mongoose");
const { joiSchema, model: Contact } = require("../Schema/schema");
const BASE_URL = process.env.DATABASE_URI;

mongoose
  .connect(BASE_URL)
  .then(() => console.info("Database connection successful"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // List Contact
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

// Get Contact By Id
async function getContactById(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId).exec();
    console.log(contact);

    if (contact === null || contact === undefined) {
      return res.status(404).send({ message: "Not found" });
    }

    res.status(201).send(contact);
  } catch (error) {
    console.error(`Error while fetching contact with ID ${contactId}: ${error}`);
    next(error);
  }
}

// Add Contact
async function addContact(req, res, next) {
  const { name, email, phone } = req.body;

  try {
    // Валидация email с использованием Joi
    const validation = joiSchema.validate({name, email, phone});
    if (validation.error) {
      return res.status(400).send({ message: validation.error.details.map((error) => error.message)
        .join(", ") });
    }

    const result = await Contact.create({ name, email, phone });

    res.status(201).send(result);
  } catch (error) {
    console.error(`Error while adding a new contact: ${error}`)
    next(error);
  }
}

// Remove Contact
async function removeContact(req, res, next) {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(contactId);

    if (result === null) {
      return res.status(404).send({ message: "Not found" });
    }

    res.send(result)
  } catch (error) {
    console.error(`Error while removing contact with ID ${contactId}: ${error.message}`)
    next(error);
  }
}

// Update Contact
async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const contact = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  try {
    const updateContact = new Contact(contact);

    // Валидируем контакт с использованием схемы
   await updateContact.validate();

   if(updateContact.error){
    return res.status(400).send({message: "Validation Error"})
   }

    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });

    if (result === null) {
      return res.status(404).send({ message:"Not found"});
    }
    res.status(201).send(result);
  } catch (error) {
    console.error(`Error updating contact: ${error.message}`);
    next(error);
  }
}

// Status Contact
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
