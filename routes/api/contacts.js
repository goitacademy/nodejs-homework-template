const express = require("express");

const router = express.Router();

const { checkContact, checkBody } = require("../../middlewares");
const {
  getContactsController,
  getByIdController,
  createContactController,
  deleteContactController,
  putContactController,
} = require("../../controllers");

router.get("/", getContactsController);
router.post("/", checkBody, createContactController);

router.get("/:contactId", checkContact, getByIdController);
router.put("/:contactId", checkBody, checkContact, putContactController);
router.delete("/:contactId", checkContact, deleteContactController);

// router.get("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

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
