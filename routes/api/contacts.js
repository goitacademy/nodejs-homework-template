const express = require("express");
const router = express.Router();
const Contacts = require("../../model");
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatus,
} = require("./validation");

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
});

router.post("/", validationCreateContact, async (req, res, next) => {
  try {
    const contacts = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", validationUpdateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.id, req.body);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    }
    return res.json({ status: "error", code: 404, message: "Not found" });
  } catch (e) {
    next(e);
  }
});

router.patch(
  "/:id/favourite",
  validationUpdateStatus,
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(req.params.id, req.body);
      if (contact) {
        return res.json({
          status: "success",
          code: 200,
          data: { contact },
        });
      }
      return res.json({ status: "error", code: 404, message: "Not found" });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
