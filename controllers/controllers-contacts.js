import express from "express";
import contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { contactAddScheme, contactUpdateScheme } from "../schemas/schemas.js";

const router = express.Router();

const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getByid = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultId = await contactsService.getContactById(contactId);
    if (!resultId) {
      throw HttpError(404, `Contact with contactId=${contactId} not found`);
      // const error = new Error(`Contact with id=${id} not found`);
      // error.status = 404;
      // throw error;
    }
    res.json(resultId);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { error } = contactAddScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const resultAdd = await contactsService.addContact(req.body);
    res.status(201).json(resultAdd);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultDel = await contactsService.removeContact(contactId);
    if (!resultDel) {
      throw HttpError(404, `Contact with contactId=${contactId} not found`);
    }
    res.json(resultDel);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactUpdateScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const resultUpdate = await contactsService.updateContactById(
      contactId,
      req.body
    );
    if (!resultUpdate) {
      throw HttpError(404, `Contact with contactId=${contactId} not found`);
    }
    res.json(resultUpdate);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getByid,
  addContact,
  deleteContact,
  updateContact,
};
