const express = require("express");

const router = express.Router();

const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({ status: "success", code: 200, data: { result: contacts } });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", code: 500, message: "Server error" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact id ${id} not found`,
      });
      return;
    }
    res.json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", code: 500, message: "Server error" });
  }
});

// router.post("/", async (req, res, next) => {
//   const contacts = await contactsOperations.addContact();
//   res.json({ message: "template message" });
// });

// router.delete("/:id", async (req, res, next) => {
//   const contacts = await contactsOperations.removeContact();
//   res.json({ message: "template message" });
// });

// router.put("/:id", async (req, res, next) => {
//   const contacts = await contactsOperations.updateContact();
//   res.json({ message: "template message" });
// });

module.exports = router;
