const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/db-functions");
const validate = require("./validation");

router.get("/", async (_req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
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
  } catch (e) {
    next(e);
  }
});

router.post("/", validate.createContactValidation, async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;

    const contact = await addContact(name, phone, email);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    const contacts = await removeContact(req.params.id);
    if (contacts.length !== allContacts.length) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contacts,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
});

router.patch(
  "/:id",
  validate.updateContactValidation,
  async (req, res, next) => {
    try {
      const contact = await updateContact(req.params.id, req.body);
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
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
