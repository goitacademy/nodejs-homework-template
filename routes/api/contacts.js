// const express = require("express");
// const path = require("path");
// const ctrl = require(path.resolve(__dirname, "../../controllers"));
// const { validateBody } = require(path.resolve(__dirname, "../../middlewares"));
// const schemas = require(path.resolve(__dirname, "../../schemas"));

// const router = express.Router();

// router.get("/", ctrl.contacts.getAll);

// router.get("/:contactId", ctrl.contacts.getById );

// router.post("/", validateBody(schemas.addSchema), ctrl.contacts.add);

// router.delete("/:contactId", ctrl.contacts.deleteById );

// router.put("/:contactId", validateBody(schemas.addSchema), ctrl.contacts.updateContactById);

// module.exports = router;


const express = require("express");
const Joi = require("joi")
const path = require("path");
const { httpError} = require(path.resolve(__dirname, "../../helpers"))
const {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
} = require(path.resolve(__dirname, "../../models/contacts"));

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

  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
        const contacts = await listContacts();
        if(!contacts) {
          throw httpError(404, "Not found")
        }
        res.status(200).json({ contacts });
        
      } catch (error) {
        next(error)
      }
  });

  router.get("/:contactId", async (req, res, next) => {
    try {
    const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
    const contactById = await getContactById(contactId);
    if(!contactById) {
        throw httpError(404, "Not found")
      }
      res.status(200).json({ contactById });
    
      } catch (error) {
        next(error)
      }
  });

  router.post("/", async (req, res, next) => {
    try {
        const {error} = addSchema.validate(req.body)
        if(error) {
          throw httpError(400, error.message)
        }
        const { name, email, phone } = req.body; // Извлекаем данные из тела запроса
    // console.log(req.body)
    const newContact = await addContact({ name, email, phone }); // Передаем параметр contact
    
  res.status(201).json({ newContact });
} catch (error) {
  next(error)
}
  });

  router.delete("/:contactId", async (req, res, next) => {
    try {
        const contactId = req.params.contactId; // Получаем значение contactId из параметров запроса
        const removedById = await removeContact(contactId);
    
        if(!removedById) {
          throw httpError(404, "Not found")
        }  
        res.json({
          message: "Delete success"
        })  
      } catch (error) {
        next(error)
      }
  });

  router.put("/:contactId", async (req, res, next) => {
    try {
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
    
      res.json({ updatedContact });
  
    } catch (error) {
        next(error)
      }
  });
  
  module.exports = router;