const express = require("express");
const router = express.Router();
const {
  validateUpdateContact,
  validateAddContact,
  validatesRemoveContact,
  validatesGetContactById,
  validatesStatusContact,
} = require("./ validation");

const fn = require("../../model/index");

router.get("/", async (_req, res, next) => {
  try {
    const contactsList = await fn.listContacts();
    if (contactsList) {
      console.log("contacsList", contactsList);
      return res.status(200).json({
        status: "success",
        code: 200,
        data: contactsList,
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "contact was not deleted",
      });
    }
  } catch (e) {
    next(e.message);
  }
});

router.get("/:contactId", validatesGetContactById, async (req, res, next) => {
  try {
    const contact = await fn.getContactById(req.params.contactId);

    if (contact) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: contact,
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e.message);
  }
});

router.post("/", validateAddContact, async (req, res, next) => {
  try {
    const newContact = await fn.addContact(req.body);

    if (newContact) {
      res.status(201).json({
        status: "success",
        code: 201,
        data: newContact,
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "contact was not deleted",
      });
    }
  } catch (e) {
    next(e.message);
  }
});

router.delete("/:contactId", validatesRemoveContact, async (req, res, next) => {
  try {
    const deletedContact = await fn.removeContact(req.params.contactId);

    if (deletedContact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: deletedContact,
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "contact was not deleted",
      });
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:contactId", validateUpdateContact, async (req, res, next) => {
  try {
    const contact = await fn.updateContact(req.params.contactId, req.body);

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: contact,
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "contact was not deleted",
      });
    }
  } catch (e) {
    next(e.message);
  }
});

router.patch(
  "/:contactId/favorite",
  validatesStatusContact,
  async (req, res, next) => {
    try {
      if (req.body) {
        const contact = await fn.updateStatusContact(
          req.params.contactId,
          req.body
        );
        return res.status(200).json({
          status: "success",
          code: 200,
          data: contact,
        });
      } else {
        return next(
          res.status(400).json({
            status: "error",
            code: 400,
            message: "missing field favorite",
          })
        );
      }
    } catch {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "not found",
      });
    }
  }
);

module.exports = router;
