const express = require("express");
const Joi = require("joi").extend(require("joi-phone-number"));
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");
const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().phoneNumber().required(),
  favorite: Joi.boolean().required(),
});
const favSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

// Get contacts - works x2
router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  res.status(200).json({ message: contacts });
});

// Get contacts with id - works x2
router.get("/:contactId", async (req, res, next) => {
  try {
    const foundContact = await getContactById(req.params.contactId);
    if (foundContact) {
      res.status(200).json(foundContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// Add contact- works x2

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const add = await addContact(req.body);
      res.status(201).json({ message: add });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Delete contact- works x2
router.delete("/:contactId", async (req, res, next) => {
  try {
    const response = await removeContact(req.params.contactId);
    console.log("response:", response);
    if (response) {
      res.json({ message: `Contact ${response.name} deleted` });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// Update contact- works x2
router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const updatedContact = await updateContact(
        req.params.contactId,
        req.body
      );

      if (updatedContact) {
        return res.status(200).json({ message: updatedContact });
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// Update status- works
router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = favSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Missing field favorite" });
    }
    const { contactId } = req.params;
    const { favorite = false } = req.body;

    const contactStatus = await updateStatusContact(contactId, { favorite });
    if (contactStatus) {
      return res.status(200).json({ message: `Contact updated` });
    } else {
      return res.status(400).json({ message: `Not found` });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
