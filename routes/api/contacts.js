const express = require("express");
const {
  updateContact,
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();

  res.json({ data, message: "success" });
});

router.get("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);

  res.json({ data, message: "successS" });
});

router.post("/", async (req, res, next) => {
  const data = await addContact(req.body);
  res.json({ data, message: "successP" });
});

router.delete("/:contactId", async (req, res, next) => {
  const data = await removeContact(req.params.contactId);

  res.json({ data, message: "successDe" });
});

router.put("/:contactId", async (req, res, next) => {
  const data = await updateContact(req.params.contactId, req.body);
  // console.log(data);
  // if (!data) {
  //   return res.status(400).json({ message: "Failure" });
  // }
  res.json({ data, message: "successPu" });
});

module.exports = router;
