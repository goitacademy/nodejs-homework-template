import Contact from '../models/contact.js';
import { HttpError } from '../helpers/index.js';

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findById(contactId);
    if (!result) {
      console.log('result', 'result');
      throw HttpError(404, "message: 'Not found'");
    }
    res.json(result);
  } catch (error) {
    console.log('result', error.status);
    next(error);
  }
};

// export const deleteById = async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const result = await contactServises.removeContact(contactId);
//     console.log('result', result);
//     if (!result) {
//       throw HttpError(404, `message: Not found `);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

export const add = async (req, res, next) => {
  const a = req.body;
  // try {
  console.log('a', a);
  const createContact = await Contact.create(req.body);
  res.status(201).json(createContact);
  // } catch (error) {
  //   console.log('error', error);
  //   next(error);
  // }
};

export const put = async (req, res, next) => {
  //   const { error } = contactAddShcema.validate(req.body);
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      name,
      email,
      phone,
      { new: true }
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default { add, getAll, getById, put };
//, deleteById
