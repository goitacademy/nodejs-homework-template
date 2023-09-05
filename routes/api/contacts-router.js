import express from "express";

import contactsService from "../../models/contacts/contacts.js";

const contactsRouter = express.Router();
import HttpError from "../../helpers/HttpErros";

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
      // const error = new Error(`Contact with id=${contactId} not found`);
      // error.status = 404;
      // throw error;
      // return res.status(404).json({
      //   message: `Contact with id=${contactId} not found`,
      // });
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(500).json({
      message: "Server error",
    });
  }
});

// contactsRouter.post("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// contactsRouter.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// contactsRouter.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

export default contactsRouter;
