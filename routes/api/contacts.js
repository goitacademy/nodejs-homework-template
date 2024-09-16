const express = require("express");
const { nanoid } = require("nanoid");
const app = express();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { postSchema, putSchema } = require("../../models/joi");

const router = express.Router();

app.use(express.json());

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ message: "List of contacts", contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json({ message: "Found contact by id", contact });
  }
});

router.post("/", async (req, res, next) => {
  const contact = postSchema.validate(req.body);

  if (contact.error) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    contact.value.id = nanoid();
    addContact(contact.value);
    res.status(201).json({ message: "Contact saved", contact });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  removeContact(contactId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.error(err));
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = putSchema.validate(req.body);

  if (body.error) {
    res.status(400).json(body.error.message);
  } else {
    updateContact(contactId, body.value)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.error(err));
  }
});

module.exports = router;
