
const { HttpError, ctrlWrapper } = require("../helpers");
const contactsService = require("../models/contacts"); 
const contactsAddSchema = require("../schemas/contacts");

const getAll =  async (req, res, next) => {
	const result = await contactsService.listContacts();
	res.status(200).json(result);
  };
  
const getContactById = async (req, res, next) => {
	const result = await contactsService.getById(req.params.contactId);
	console.log(result);
	if(!result){
	  return res.status(404).json({message: "Not Found"})
	}
	res.status(200).json(result);
  };
  
  const addContact = async (req, res, next) => {
	  try {
		  const {error} = contactsAddSchema.validate(req.body)
		  if(error){
			  throw HttpError(400, {"message": "missing required name field"})
		  }
		  const result = await contactsService.addContact(req.body);
		  res.status(201).json(result)
	  } catch (error) {
		  return error.message
	  }
  };
  
  const removeContact =  async (req, res, next) => {
	  const result = await contactsService.removeContact(req.params.contactId);
	  if(!result){
		return res.status(404).json({message: "Not Found"})
	  }
	  res.status(200).json({"message": "contact deleted"});
	};
  
  const updateContact = async (req, res, next) => {
	try {
	  const {error} = contactsAddSchema.validate(req.body)
	  if(error){
		  throw HttpError(400, {"message": "missing required name field"})
	  }
	  const result = await contactsService.updateContact(req.params.contactId, req.body)
	  res.status(200).json(result)
	} catch (error) {
	  return res.status(404).json({message: "Not Found"})
	}
  };

  module.exports = {
	getAll: ctrlWrapper(getAll),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	removeContact: ctrlWrapper(removeContact),
	updateContact: ctrlWrapper(updateContact),
 };