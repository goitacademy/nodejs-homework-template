const express = require("express");
const contactsOperations = require("../../models/contacts");
const router = express.Router();

const { HttpError } = require("./helpers");

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contactsOperations.listContacts();
    return res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsOperations.getContactById(id);
    if (contact) {
      return res.status(200).json(contact);
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
});

// router.get("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.post("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

module.exports = router;
