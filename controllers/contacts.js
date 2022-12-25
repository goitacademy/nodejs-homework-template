const contactsOperations = require('../models/contacts ');
const {NotFound} = require("http-errors");
const Joi = require("joi");

const contactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
})


const getAll = async(req, res, next)=>{
    try {
        const contacts = await contactsOperations.listContacts();
        res.json({
            status: "success",
            code: 200,
            data: {
                result: contacts
            }
        });
    } catch (error) {
        next(error);
     
    }
  }

  const getById = async (req, res, next) => {
    try {
      const{contactId} = req.params;
      const result = await contactsOperations.getContactById(contactId);
      if(!result){
        throw new NotFound( `Product with id=${contactId} not found`);
        }
    res.json({
      status: "success",
      code: 200,
      data: {
          result
      }
  })
    } catch (error) {
      next(error);
    }
}
  
const add = async(req, res, next)=> {
    try {
        const {error} = contactsSchema.validate(req.body);
        if(error){
            error.status = 400;
            throw error;
        }
        const result = await contactsOperations.addContact(req.body);
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
  }

  const deleteById = async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await contactsOperations.removeContact(id);
        if(!result){
            throw new NotFound( `Product with id=${id} not found`);
        }
        // res.status(204).json()
        res.json({
            status: "success",
            code: 200,
            message: "product deleted",
            data: {
                result
            }
        })
  
    } catch (error) {
        next(error);
    }
  }

  const updateById = async(req, res, next)=> {
    try {
        const {error} = contactsSchema.validate(req.body);
        if(error){
            error.status = 400;
            throw error;
        }
        const {id} = req.params;
        const result = await contactsOperations.updateById(id, req.body);
        if(!result){
            throw new NotFound( `Product with id=${id} not found`);
        }
        res.json({
            status: "success",
            code: 200,
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
  }

module.exports = {
    getAll,
    getById,
    add,
    deleteById,
    updateById
}