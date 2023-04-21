import * as services from "../services/contacts.js";
import {
  isContactTaken,
  isReqPostBodyOk,
  validationFavorite,
  validationSchema,
} from "../validation.js";

export const getContacts = async (req, res, next) => {
  try {
    const id = req.user._id;
    console.log(id.valueOf());
    const { page, limit, favorite } = req.query;

    const contacts = await services.getAllContacts(id, page, limit, favorite);
    return res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContactByID = async (req, res, next) => {
  try {
    const id = req.user._id;
    const { contactId } = req.params;
    console.log(contactId);
    const contacts = await services.getContactById(contactId, id);
    if (!contacts) return res.status(404).json({ message: "Not found" });
    else return res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const id = req.user._id;
    const checkBody = isReqPostBodyOk(req.body);
    if (!checkBody)
      return res.status(400).json({ message: "missing required name - field" });

    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).json({ message: `${error}` });

    const contactslist = await services.getAllContacts(id);
    isContactTaken(req.body, contactslist);

    const addedContact = await services.addContact(req.body, id);
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
