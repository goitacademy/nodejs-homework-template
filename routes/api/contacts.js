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
    res.json({ satus: 200, data: contacts });
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const contactsById = await getContactById(req.params.contactId);

    if (contactsById) {
      res.json({ satus: 200, data: contactsById });
    } else {
      res.json({ satus: 404, message: "Not found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, name, phone } = req.query;

    const { value, error } = createNewContactSchema.validate({
      name,
      email,
      phone,
    });

    if (error) {
      res.json({ satus: 400, message: error.details[0].message });
      return;
    }

    const newContact = await addContact(value);

    if (newContact) {
      res.json({ satus: 201, data: newContact });
    } else {
      res.json({ satus: 400, message: "Contact exists already" });
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
    if (Object.keys(req.query).length === 0) {
      res.json({ satus: 400, message: "missing fields" });
      return;
    }

    const { value, error } = updateContactSchema.validate(req.query);

    if (error) {
      res.json({ satus: 400, message: error.details[0].message });
      return;
    }

    const { contactId } = req.params;
    const contactsById = await getContactById(contactId);

    if (contactsById) {
      const updatedContact = await updateContact(contactId, value);
      res.json({ satus: 200, data: updatedContact });
    } else {
      res.json({ satus: 404, message: "Not found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
