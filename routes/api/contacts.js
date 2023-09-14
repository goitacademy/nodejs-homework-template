const express = require("express");

const createNewContactSchema = require("../../schemes/createNewContact/createNewContact");
const updateContactSchema = require("../../schemes/updateContact/updateContact");

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../contacts");

router.get("/", async (_, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const contactsById = await getContactById(req.params.contactId);

    if (contactsById) {
      res.status(200).json(contactsById);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, name, phone } = req.body;

    const { value, error } = createNewContactSchema.validate({
      name,
      email,
      phone,
    });

    if (error) {
      const reqField = error.details[0].message.replace(/"/g, "").split(" ")[0];

      res.status(400).json({ message: `missing required ${reqField} field` });
      return;
    }

    const newContact = await addContact(value);

    if (newContact) {
      res.status(201).json(newContact);
    } else {
      res.status(400).json({ message: "Contact exists already" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.delete("/:contactId", async (req, res) => {
  try {
    const contactsById = await removeContact(req.params.contactId);

    if (contactsById) {
      res.json({ satus: 200, message: "contact deleted" });
    } else {
      res.json({ satus: 404, message: "Not found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.put("/:contactId", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const { value, error } = updateContactSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { contactId } = req.params;
    const contactsById = await getContactById(contactId);

    if (contactsById) {
      const updatedContact = await updateContact(contactId, value);
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
