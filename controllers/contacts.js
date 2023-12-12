const Contact = require("../models/contact");

const { HttpError, ctrlWrapper} = require("../helpers"); // імпортуємо помилку для прокидування


// ф-ції, які підключаються до необхідних ф-цій з models і повертають необхідні дані:
// усі контакти, або контакт по id, або заміняють, видаляють, додають контакт

const getAll = async (req, res) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}; 

// const getById = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

const add = async (req, res) => {    
    const result = await Contact.create(req.body);
    res.status(201).json(result);  
};

// const updateById = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const { error } = addSchema.validate(req.body);

//     if (error) {
//       throw HttpError(400, { message: "missing fields" });
//     }

//     const result = await contacts.updateContact(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteById = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contacts.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.status(200).json({ message: "contact deleted" });
//   } catch (error) {
//     next(error);
//   }
// };
    
module.exports = {
  getAll,
  //   getById,
  add,
  //   updateById,
  //   deleteById,
};