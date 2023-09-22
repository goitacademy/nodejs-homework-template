const express = require("express");
const { HttpError } = require("../../helpers");
const contacts = require("../../models/contacts")
const { userSchema } = require("../../schemas");

const router = express.Router();

// Routes
router.get("/", async (_, res,next) => {
  try {
    const result = await contacts.listContacts();
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404);
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(userSchema.validate(req.body));
    const {error} = userSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.details[0].message);
    }
    const result = await contacts.addContact(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
      const { contactId } = req.params;
      const result = await contacts.removeContact(contactId);
      if (!result) {
        throw HttpError(404);
      }
      return res.json({ "message": "Contact deleted" });
  } catch (error) {
    next(error);
  }


});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    const { contactId } = req.params;
    const result = await contacts.updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404);
    }

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
