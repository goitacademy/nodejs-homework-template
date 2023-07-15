const express = require("express");

const router = express.Router();

const {
  listContacts,
  getById,
  removeContact,
  addContact,
} = require("../../models/contacts");

const HttpError = require("../../helpers/HttpErrors");

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getById(contactId);
    console.log(result);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const remove = await removeContact(contactId);
    res.json(remove);
  } catch (error) {
    next(error);
  }
});

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     res.json({ message: "template message" });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
