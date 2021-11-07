const express = require("express");
const router = express.Router();
const CreateError = require("http-errors");
const { NotFound } = require("http-errors");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/index");
const { validation } = require("../../middlewares");
const { joiSchema, joiSchemaUpdate } = require("../../validations");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw new CreateError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", validation(joiSchema), async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "Remove success",
    });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:contactId",
  validation(joiSchemaUpdate),
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await updateContact(contactId, req.body);
      if (!result) {
        res.status(400).json({
          status: "error",
          code: 400,
          message: "Missing field",
        });
        return;
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
