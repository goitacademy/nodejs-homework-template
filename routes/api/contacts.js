const express = require("express");
const { nanoid } = require("nanoid");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const schema = require("../../utils/validation");

const router = express.Router();

router.get("/", async (_, res, next) => {
  try {
    const contacts = await listContacts();

    res.json({
      status: 200,
      data: {
        contacts,
      },
    });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    contact
      ? res.json({
          status: 200,
          data: {
            contact,
          },
        })
      : res.status(404).json({
          status: 404,
          message: "Not Found",
        });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const body = await schema.validateAsync(req.body);
    const contact = { id: nanoid(), ...body };
    await addContact(contact);

    res.status(201).json({
      status: 201,
      data: {
        contact,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.details[0].message ?? "Bad Request",
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const condition = await removeContact(contactId);

    condition
      ? res.json({
          status: 200,
          message: "contact deleted",
        })
      : res.status(404).json({
          status: 404,
          message: "Not Found",
        });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.put("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const body = await schema.validateAsync(req.body);
    const contact = await updateContact(contactId, body);

    contact
      ? res.json({
          status: 200,
          data: {
            contact,
          },
        })
      : res.status(404).json({
          status: 404,
          message: "Not Found",
        });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.details[0].message ?? "Bad Request",
    });
  }
});

module.exports = router;
