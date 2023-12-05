// import contactService from "../models/contacts.js"; // logical-func
import { HttpError } from "../helpers/index.js"; // errors
import {ctrlWrapper} from '../decorators/index.js'
// import {
//   contactAddSchema,
//   updateScheme,
// } from "../models/Contact.js";
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
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
      if (!result) {
          throw HttpError(404, `Contact with id=${id} was not found`);
      }
      res.json(result);
};

const addNewContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};


// const getAllContacts = async (req, res, next) => {
//   try {
//     const result = await contactService.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };


// const updateById = async (req, res) => {
//   // try {
//     // const validatedResult = updateScheme.validate(req.body);
//     // const error = validatedResult.error;

//     const id = req.params.contactId;
//     const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

//     if (!result) {
//       throw HttpError(400, `Contact with id: ${id} doesn't found`);
//     }
//     res.json(result);
//   // } catch (error) {
//   //   next(error);
//   // }
// };

// const getByID = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactService.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, "Contact does not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const addNewContact = async (req, res, next) => {
//   try {
//     const validatedResult = contactAddSchema.validate(req.body);
//     const error = validatedResult.error;
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const result = await contactService.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateById = async (req, res, next) => {
//   try {
//     const validatedResult = updateScheme.validate(req.body);
//     const error = validatedResult.error;
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const id = req.params.contactId;
//     const result = await contactService.updateContact(id, req.body);
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteById = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactService.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, "Contact does not found");
//     }
//     res.status(201).json({ message: "Contact is deleted" });
//   } catch (error) {
//     next(error);
//   }
// };

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getByID:ctrlWrapper(getByID),


  
  addNewContact:ctrlWrapper(addNewContact),
  updateById: ctrlWrapper(updateById),
//   deleteById:ctrlWrapper(deleteById),
};
