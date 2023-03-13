const express = require("express");
const router = express.Router();

const contactSchema  = require("../../schema/contactsSchema");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const validate = require("../../middleware/validationWare");

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data,
  });
});

router.get("/:contactId", async (req, res, next) => {
 const { contactId } = req.params;
 const data = await getContactById(contactId);
 res.json({
   status: "success",
   code: 200,
   data,
 });
});

router.post("/", validate(contactSchema), async (req, res, next) => {
  const body = req.body;
  const data = await addContact(body);
  res.json({
    status: "success",
    code: 200,
    data,
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  res.json({
    status: "success",
    code: 200,
    data,
  });
});

router.put("/:contactId", validate(contactSchema), async (req, res, next) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);
  res.json({
    status: "success",
    code: 200,
    data,
  });
});

module.exports = router;
