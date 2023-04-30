const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");
const { RequestError } = require('../../helpers');
const {
  bodySchema
} = require('../../schemas/contacts');

const router = express.Router();

router.get("/", async (requirement, response, next) => {
  try {
    const contacts = await listContacts();
    response.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (requirement, response, next) => {
  try {
    const contactId = requirement.params.contactId;
    const contactById = await getContactById(contactId);

    if (!contactById) {
      throw RequestError(404, "Not found contact");
    }

    response.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (requirement, response, next) => {
  try {
    const validationResult = bodySchema.validate(requirement.body)
    const body = requirement.body;

    if (validationResult.error) {
      throw RequestError(404, "missing required name field");
    }

    const newContact = await addContact(body);

    response.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (requirement, response, next) => {
  try {
    const contactId = requirement.params.contactId;
    const findContactById = await removeContact(contactId);

    if (!findContactById) {
      throw RequestError(404, "Not found contact");
    }

    response.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (requirement, response, next) => {
  try {
    const contactId = requirement.params.contactId;
    const body = requirement.body;

    const validationResult = bodySchema.validate(body);

    if (validationResult.error) {
      throw RequestError(400, validationResult.error.details[0].message);
    }

    const currentContact = await getContactById(contactId);

    if (!currentContact) {
      throw RequestError(404, "Contact not found contact");
    }

   const { name, email, phone } = body;
  

    if (name) {
      currentContact.name = name;
    }

    if (email) {
      currentContact.email = email;
    }    

     if (phone) {
    currentContact.phone = phone;
    }

    const contactUpdate = await currentContact(contactId, currentContact);

    if (!contactUpdate) {
      throw RequestError(404, "Not found update");
    }

    res.status(200).json(contactUpdate);
  } catch (error) {
    next(error);
  }
});


module.exports = router;