const Joi = require("joi")
const path = require("path");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { httpError} = require(path.resolve(__dirname, "../helpers"))
const {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
} = require(path.resolve(__dirname, "../models/contacts"));

const addSchema = Joi.object({
  name: Joi.string()
  .trim()
  .required(),
  email: Joi.string()
  .trim()
  .email()
  .required(),
  phone: Joi.string()
  .trim()
  .regex(/^\+\d{1}\d{8,15}$/)
  .messages({
    'string.pattern.base': 'Phone number must start with a plus sign (+) and have 9 to 16 digits.',
  })
  .required()
});

  const getAll =  async (req, res, next) => {
        const contacts = await listContacts();
        if(!contacts) {
          throw httpError(404, "Not found")
        }
        res.status(200).json( contacts );
      }

  const getById = async (req, res, next) => {
    const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
    const contactById = await getContactById(contactId);
    if(!contactById) {
        throw httpError(404, "Not found")
      }
      res.status(200).json( contactById );
  }

  const add = async (req, res, next) => {
        const {error} = addSchema.validate(req.body)
        if(error) {
          throw httpError(400, error.message)
        }
        const { name, email, phone } = req.body; // Извлекаем данные из тела запроса
    // console.log(req.body)
    const newContact = await addContact({ name, email, phone }); // Передаем параметр contact
    
  res.status(201).json( newContact );
  }

const deleteById = async (req, res, next) => {
      const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
      const removedById = await removeContact(contactId);
  
      if(!removedById) {
        throw httpError(404, "Not found")
      }  
      res.json({
        message: "Delete success"
      })
}

  const updateContactById = async (req, res, next) => {
        const {error} = addSchema.validate(req.body)
        if(error) {
          throw httpError(400, error.message)
        }
  
    const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
    const { name, email, phone } = req.body; // Извлекаем данные из тела запроса
  
    const newContact = { name, email, phone }; // Создаем объект newContact
  
    const updatedContact = await updateContact(contactId, newContact); // Передаем параметры contactId и newContact
    if(!updatedContact) {
        throw httpError(404, "Not found")
      }
    
      res.json( updatedContact );
  }

  // module.exports = {
  //   getAll,
  //   getById,
  //   add,
  //   deleteById,
  //   updateContactById,
  // }
  
  module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateContactById: ctrlWrapper(updateContactById),
  }
  