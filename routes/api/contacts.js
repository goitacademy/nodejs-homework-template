const express = require("express");
const router = express.Router();

const {
  getListOfContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
} = require("../../model/contactsOperations/index");

const { validation } = require("../../middlewares/index");
const { contactsSchema } = require("../../validation-schemas/index");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await getListOfContacts();
    res.json({
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

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const contact = await getContactById(id);

    if (!contact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", validation(contactsSchema), async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const deletedContact = await deleteContactById(id);
    if (!deletedContact) {
      const deleteError = new Error("Not found");
      deleteError.status = 404;
      throw deleteError;
    }

    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
      data: {
        deletedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:contactId",
  validation(contactsSchema),
  async (req, res, next) => {
    try {
      const id = req.params.contactId;

      const updatedContact = await updateContactById(id, req.body);

      if (!updatedContact) {
        const error = new Error("Not found");
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          updatedContact,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
