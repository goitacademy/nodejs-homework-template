
import Contact from '../models/contact.js';
import { HttpError } from '../helpers/index.js';
import {ctrlWrapper} from '../decorators/index.js';



const getAll = async (req, res) => {
  const result = await Contact.find();
    res.json(result);
}

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);

}

const add = async (req, res) => { 
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json({ message: 'Contact deleted!' });
}

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
        throw HttpError(404, 'Not found');
    }

    res.json(result);
}

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
        throw HttpError(404, 'Not found');
    }

    res.json(result);
}

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite:ctrlWrapper(updateFavorite)
}