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
  const { contactId } = req.params;
  try {
    const result = await getContactById(contactId);
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: `contact with id: ${result.id}`,
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
      message: "Сontact added",
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
      message: "contact deleted",
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
        message: "Contact updated",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
