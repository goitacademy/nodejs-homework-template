
import { HttpError } from "../helpers/index.js"; 
import {ctrlWrapper} from '../decorators/index.js'
import Contact from "../models/Contact.js";


const getAllContacts = async (req, res, next) => {
    const result = await Contact.find({})
    res.json(result);

};

const getByID = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Contact does not found");
    }
    res.json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  console.log("req.body", req.body)
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if (!result) {
          throw HttpError(404, `Contact with id=${id} was not found`);
      }
      res.json(result);
};





const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    if (error) {
      throw HttpError(404, "missing field favorite");
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    res.status(200).json(result);
};




const addNewContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};



const deleteById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete (contactId);
    if (!result) {
      throw HttpError(404, "Contact does not found");
    }
    res.json({ message: "Contact is deleted" });

};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),  
  getByID:ctrlWrapper(getByID), 
  addNewContact:ctrlWrapper(addNewContact), 
  updateById: ctrlWrapper(updateById),
  deleteById:ctrlWrapper(deleteById),
  updateStatusContact:ctrlWrapper(updateStatusContact)
};
