const express = require("express");
const router = express.Router();
const Contacts = require("../../model/index");
const { validateContact, validateFavorite } = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const data = await Contacts.listContacts();
    return res.json({ status: "success", code: 200, data });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const data = await Contacts.getContactById(req.params.contactId);
    if (data) return res.json({ status: "success", code: 200, data });
    return res.json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await Contacts.addContact(req.body);
    return res.status(201).json({ status: "success", code: 201, data });
  } catch (error) {
    if (error.name === "ValidationError") {
      error.status = 400;
    }
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const data = await Contacts.removeContact(req.params.contactId);
    if (data)
      return res.status(201).json({ status: "success", code: 201, data });
    return res.json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validateContact, async (req, res, next) => {
  try {
    const data = await Contacts.updateContact(req.params.contactId, req.body);
    if (data)
      return res.status(201).json({ status: "success", code: 201, data });
    return res.json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId/favorite",
  validateFavorite,
  async (req, res, next) => {
    try {
      const data = await Contacts.updateStatusContact(
        req.params.contactId,
        req.body
      );
      if (data)
        return res.status(201).json({ status: "success", code: 201, data });
      return res.json({ status: "error", code: 404, message: "Not Found" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
