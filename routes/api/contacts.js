import express from "express";
import  {HttpError} from '../../helpers/HttpError.js';
import Joi from 'joi';
// const {HttpError} =require('../../helpers/HttpError.js')
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";

const addScheme = Joi.object({
  name:Joi.string().required(),
  email:Joi.string().required(),
  phone:Joi.number().required(),
})

const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    res.json(await listContacts());
  } catch(error){
    
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result =await getContactById(contactId);
    if(!result){
      throw (HttpError(404,`Contact with id ${contactId} not found:()`));
    };
    res.json(result);
  } catch(error){
    console.log(error)
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {error}=addScheme.validate(req.body)
    if(error){
      throw (HttpError(400,error.message));
    }
    const {name,email,phone}= req.body;
    res.status(201).json(await addContact(req.body));
    console.table(listContacts());
  } catch(error){
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if(!result){
      throw (HttpError(404,`Contact with id ${contactId} not found:()`));
    }
    res.json({message:"Delete successed"});
  } catch(error){
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const {error}=addScheme.validate(req.body)
    if(error){
      throw (HttpError(400,error.message));
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId,req.body);
    if(!result){
      throw (HttpError(404,`Contact with id ${contactId} not found:()`));
    }
    res.json(result);
  } catch(error){
    next(error);
  }
});

export default router;
