
  import { HttpError } from "../helpers/HttpError.js";
  import {Contact,schems} from '../models/contact.js';
  
 
  
  export const ctrlGetAllContacts = async (req, res) => {
    res.json(await Contact.find());
  };
  export const ctrlGetContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found:()`);
    }
    res.json(result);
  };
  export const ctrlAddContact = async (req, res) => {
    const { error } = schems.addScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { name, email, phone } = req.body;
    res.status(201).json(await Contact.create(req.body));
  };

  export const ctrlChangeContactById = async (req, res) => {
    const { error } = schems.addScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body,{new:true});
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found:()`);
    }
    res.json(result);
  };
  
  export const ctrlDeleteContacById = async (req, res) => {
    const { contactId,name } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found:()`);
    }
    res.json({ message: "Contact deleted successed" });
  };

  export const ctrlUpdateFavoriteLine=async (req, res) => {
    const { error } = schems.updateFavoriteLineScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body,{new:true});
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found:()`);
    }
    res.json(result);
  };