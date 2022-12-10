const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const { validate } = require("../../schema/schema");
const validation = require("../../schema/midleware");

// http://localhost:3000/api/contacts
//  npx nodemon server.js

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json({
      status: "succsses",
      code: 200,
      data: {
        result,
      },
      message: "200 succsses",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getContactById(id);
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: `contact with id: ${result}`,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", validate(validation.contact), async (req, res, next) => {
  const body = req.body;

  const result = await addContact(body);

  try {
    res.json({
      status: "success",
      code: 201,
      body: {
        result,
      },
      message: "template message",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  try {
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: "template message",
    });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:contactId",
  validate(validation.contact),
  async (req, res, next) => {
    const { contactId } = req.params;

    try {
      const result = await updateContact(contactId, req.body);
      res.json({
        status: "success",
        code: 200,
        data: {
          result,
        },
        message: "template message",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
