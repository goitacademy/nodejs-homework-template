const Joi = require("joi");
const contacts = require("../models/contacts");
const {HttpError} = require("../helpers");

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const getAllContact = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById =  async (req, res,next) => {
  
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);

  } catch (error) {
    next(error)
  }
};

const addContact = async (req, res, next) => {
  try { 
      const {error} = addSchema.validate(req.body);
      if(error){
      throw HttpError(400, error.message)
      }
      const result = await contacts.addContact(req.body);
      res.status(201).json(result)
  } catch (error) {
      next(error)
  }

};

const updateContactById = async (req, res, next) => {
  try {
      const {error} = addSchema.validate(req.body);
      if(error){
      throw HttpError(400, error.message);
      }
      const {id} = req.params;
      const result = await contacts.updateContact(id, req.body);
      if(!result){
      throw HttpError(404, "Not found" )
      }
      res.json(result)
  } catch (error) {
      next(error);
  }

};

const deleteContactById = async (req, res, next) => {
  try {
      const {id} = req.params;
      const result= await contacts.removeContact(id);
      if(!result){
          throw HttpError(400, "Not found")
      }
      res.json({message: "Delete success"});
  } catch (error) {
     next(error);
  }

}

module.exports = {
  getAllContact,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
};
