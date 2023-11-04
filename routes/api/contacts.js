const express = require("express");
const { listContacts, getContactById } = require("../../models/contacts");
const app = express();
const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.send(data);
  next();
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  // if (!data) {
  //   res.status(404).json({ message: "Not found" });
  // }
  res.send(data);
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
