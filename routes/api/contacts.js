import express from "express";

import { HttpError } from "../../helpers/index.js";

import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateFavoriteStatus,
} from "../../models/contactOperations.js";
import { verifyContactExist } from "../../helpers/verifyContactExist.js";
import { validate } from "../../helpers/validate.js";
import {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../../models/contactModel.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get(
  "/:contactId",
  verifyContactExist,
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await getContactById(contactId);
      if (!result) {
        throw HttpError(
          404,
          `Contact with ${contactId} not found
      `
        );
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

contactsRouter.post(
  "/",
  validate(addContactSchema, "body"),
  async (req, res, next) => {
    try {
      const newContact = await addContact(req.body);
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  }
);

contactsRouter.put(
  "/:contactId",
  verifyContactExist,
  validate(updateContactSchema, "body"),
  async (req, res, next) => {
    try {
      const updatedContact = updateContact(req.params.contactId, req.body);

      if (!updatedContact) {
        throw HttpError(
          404,
          `Contact with ${contactId} not found
      `
        );
      }

      res.json(updatedContact);
    } catch (error) {
      next(error);
    }
  }
);

contactsRouter.patch(
  "/:contactId/favorite",
  verifyContactExist,
  validate(updateFavoriteSchema, "body"),
  async (req, res, next) => {
    try {
      const updatedContact = await updateFavoriteStatus(
        req.params.contactId,
        req.body
      );
      if (!updatedContact) {
        throw HttpError(404, "Not Found");
      }
      res.json(updatedContact);
    } catch (error) {
      next(error);
    }
  }
);

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const deletedContact = await removeContact(req.params.contactId);
    if (!deletedContact) {
      throw HttpError(
        404,
        `Contact with ${contactId} not found
      `
      );
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
