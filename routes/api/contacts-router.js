import express from "express";
import contactsService from "../../models/contacts/contacts.js";
import {HttpError} from "../../helpers/index.js"
const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    // console.log(req.params)
    const { contactId } = req.params;

    const result = await contactsService.getContactById(contactId);
    if (!result) {
      // const error = new Error(`Movie with id=${contactId} not found`);
      // error.status = 404;
      // throw error;
      throw HttpError(404, `Movie with id=${contactId} not found`);
      // return res.status(404).json({
      //   message: `Movie with id=${contactId} not found`,
      // });
    }
    res.json(result);
  } catch (error) {
    const {status = 500, message = "Server error" } = error;
    res.status(status).json({
      message
    });
  }
});

contactsRouter.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default contactsRouter;
