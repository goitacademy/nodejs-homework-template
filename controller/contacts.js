import * as services from "../services/contacts.js";
import {
  isContactTaken,
  isReqPostBodyOk,
  validationFavorite,
  validationSchema,
} from "../validation.js";

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await services.getAllContacts();
    return res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContactByID = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await services.getContactById(contactId);
    if (!contacts) return res.status(404).json({ message: "Not found" });
    else return res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const checkBody = isReqPostBodyOk(req.body);

    const { error } = validationSchema.validate(req.body);

    if (!checkBody)
      return res.status(400).json({ message: "missing required name - field" });
    if (error) return res.status(400).json({ message: `${error}` });
    const contactslist = await services.getAllContacts();
    isContactTaken(req.body, contactslist);

    const addedContact = await services.addContact(req.body);
    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const isExist = await services.getContactById(contactId);
    if (!isExist) return res.status(404).json({ message: "Not found" });
    await services.removeContact(contactId);
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};
export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const { error } = validationSchema.validate(req.body);
    if (!(name || email || phone))
      return res.status(400).json({ message: "missing fields" });

    if (error) return res.status(400).json({ message: `${error}` });

    const contactPut = await services.updateContact(contactId, req.body);
    res.json(contactPut);
  } catch (error) {
    next(error);
  }
};

export const updateContactFavoriteField = async (req, res, next) => {
  try {
    const favorite = req.body?.favorite;
    console.log(favorite);
    const { contactId } = req.params;
    const isExist = await services.getContactById(contactId);
    if (!isExist) return res.status(404).json({ message: "Not found" });
    const { error } = validationFavorite.validate(req.body);
    if (error)
      return res.status(400).json({ message: "missing field favorite" });

    const patchContact = await services.updateStatusContact(
      contactId,
      favorite
    );
    return res.json(patchContact);
  } catch (error) {
    next(error);
  }
};
