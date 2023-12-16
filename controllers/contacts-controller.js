/** @format */
// import Joi from "joi";

import contactsService from "../models/contacts.js";
import {HttpError} from "../helpers/index.js";
import {contactAddShema, contactUpdateShema} from "../shemas/contact-shemas.js";

const listContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({message: error.message});
  }
};

const contactById = async (req, res, next) => {
  try {
    // console.log(req.params);
    const {contactId} = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
      //   const error = new Error("Not found");
      //   error.status = 404;
      //     throw error;

      //   return res.status(404).json({
      //     massage: "Not found",
      //   });
    }
    res.json(result);
  } catch (error) {
    next(error);
    // const {status = 500, message = "Server error"} = error;
    //   res.status(status).json({ message });

    // res.status(500).json({message: error.message});
  }
};

const addContact = async (req, res, next) => {
  try {
    const {error} = contactAddShema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({message: error.message});
  }
};

const updateContact = async (req, res, next) => {
  try {
    const {error} = contactUpdateShema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const {contactId} = req.params;
    // console.log(id);

    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    //   res.status(201).json(result);
    res.json({message: "contact deleted"});
  } catch (error) {
    next(error);
  }
};

export default {
  listContacts,
  contactById,
  addContact,
  updateContact,
  removeContact,
};
