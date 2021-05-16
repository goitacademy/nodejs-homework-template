const express = require("express");
const router = express.Router();

const Contacts = require("../../model/contacts");
// const Contact = require("../../model/schemas/contact");

const {
  validateAddContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  validateObjectId,
} = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", validateObjectId, async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validateAddContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    if (contact) {
      return res.status(201).json({
        status: " success",
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", validateObjectId, async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validateUpdateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId/favorite",
  validateUpdateStatusContact,
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body
      );
      if (contact) {
        return res.json({
          status: "success",
          code: 200,
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: "error",
          code: "404",
          data: "Not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
