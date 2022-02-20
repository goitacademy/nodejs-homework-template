const express = require("express");
const contactModel = require("../../models/contacts");
const {
  schemaCreateContact,
  schemaUpdateContact,
} = require("./contacts-validation-schemes");
const { validateBody } = require("../../middlewares/validation");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await contactModel.listContacts();
  res.json({ status: "success", code: 200, payload: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await contactModel.getContactById(req.params.contactId);
  if (!contact) {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
  return res.json({ status: "success", code: 200, payload: { contact } });
});

router.post("/", validateBody(schemaCreateContact), async (req, res, next) => {
  const contact = await contactModel.addContact(req.body);
  res.status(201).json({ status: "success", code: 201, payload: { contact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await contactModel.removeContact(req.params.contactId);
  if (!contact) {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
  return res.json({ status: "success", code: 200, payload: { contact } });
});

router.put(
  "/:contactId",
  validateBody(schemaUpdateContact),
  async (req, res, next) => {
    const contact = await contactModel.updateContact(
      req.params.contactId,
      req.body
    );
    if (!contact) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
);

router.patch("/:contactId/phone", async (req, res, next) => {
  const contact = await contactModel.updateContact(
    req.params.contactId,
    req.body
  );
  if (!contact) {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
  return res.json({ status: "success", code: 200, payload: { contact } });
});

module.exports = router;
