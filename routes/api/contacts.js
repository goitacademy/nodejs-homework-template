const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");
const {HttpError} = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error)
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if(!result){
      throw HttpError(404, "Not found");
    }
    res.json(result);
    }
     catch (error) {
      next(error);
   }
});

router.post("/", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});




// router.delete("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
// });

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

module.exports = router;
