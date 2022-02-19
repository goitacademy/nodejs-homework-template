const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  schemaCreateContact,
  schemaUpdateContact,
} = require("./contactsValidationSchemes");
const { validateBody } = require("../../middlewares/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ code: 200, status: "success", payload: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    return res
      .status(200)
      .json({ code: 200, status: "success", payload: { contact } });
  }
  return res
    .status(404)
    .json({ code: 404, status: "error", message: "Not found" });
});

router.post("/", validateBody(schemaCreateContact), async (req, res, next) => {
  const contact = await addContact(req.body);
  res.status(201).json({ code: 201, status: "success", payload: { contact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (contact) {
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "contact deleted",
    });
  }
  return res
    .status(404)
    .json({ code: 404, status: "error", message: "Not found" });
});

router.put(
  "/:contactId",
  validateBody(schemaUpdateContact),
  async (req, res, next) => {
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      return res
        .status(200)
        .json({ code: 200, status: "success", payload: { contact } });
    }
    return res
      .status(404)
      .json({ code: 404, status: "error", message: "Not found" });
  }
);

module.exports = router;
