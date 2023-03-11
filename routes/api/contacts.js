const express = require("express");


const { catchAsync, createContactValidation } = require("../../utils");
const contactsOperation = require("../../models/contacts");
const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const contacts = await contactsOperation.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { result: contacts },
      message: "Contacts list is done",
    });
  })
);

router.get(
  "/:contactId",
  catchAsync(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contactsOperation.getContactById(contactId);
    if (!result) {
      res.json({
        status: "error",
        code: 404,
        message: `Contact with id=${contactId} not found`,
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
      message: `${result.name} was found`,
    });
  })
);

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const { error } = createContactValidation(req.body);

    if (error) {
      const { name, phone, email } = req.body;
      if (!name) {
        return res.json({
          status: "error",
          code: 400,
          message: `Ooops! You missing required name field`,
        });
      } else if (!email) {
        return res.json({
          status: "error",
          code: 400,
          message: `Ooops! You missing required email field`,
        });
      } else if (!phone) {
        return res.json({
          status: "error",
          code: 400,
          message: `Ooops! You missing required phone field`,
        });
      }
    }

    const result = await contactsOperation.addContact(req.body);
    res.json({
      status: "success",
      code: 201,
      data: {
        result,
      },
      message: `New contact ${result.name} was created successfully`,
    });
  })
);

router.delete(
  "/:contactId",
  catchAsync(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contactsOperation.removeContact(contactId);

    if (!result) {
      res.json({
        status: "error",
        code: 404,
        message: `Contact with id=${contactId} not found`,
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: `${result.name} was deleted successfully`,
    });
  })
);

router.put("/:contactId", async (req, res, next) => {
  const { error } = createContactValidation(req.body);
  if (error) {
    const { name, phone, email } = req.body;
    if (!name) {
      return res.json({
        status: "error",
        code: 400,
        message: `Ooops! You missing required name field`,
      });
    } else if (!email) {
      return res.json({
        status: "error",
        code: 400,
        message: `Ooops! You missing required email field`,
      });
    } else if (!phone) {
      return res.json({
        status: "error",
        code: 400,
        message: `Oops! You missing required phone field`,
      });
    }
  }

  const { contactId } = req.params;
  const result = await contactsOperation.updateContact(contactId, req.body);

  if (!result) {
    res.json({
      status: "error",
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
    message: `${result.name} was updated successfully`,
  });
});

module.exports = router;
