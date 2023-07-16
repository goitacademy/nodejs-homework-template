const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts')
const { HttpError } = require('../helpers');
const Joi = require('joi');
 
const contactSchema = Joi.object({
	name: Joi.string().required().messages({
		"any.required" : "missing required name field"
	}),
	email: Joi.string().required().messages({
		"any.required" : "missing required email field"
	}),
	phone: Joi.string().required().messages({
		"any.required" : "missing required phone field"
	}),
})

const getAllContactsCtrl = async (req, res, next) => {
	try {
		const contacts = await listContacts();
		
		res.json(contacts);
	} catch (error) {
		next(error);
	}
};

const getContactByIdCtrl = async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await getContactById(id);

		if (!contact) throw HttpError(404, `Not found`)
		res.json(contact);
	}
	catch (error) {
		next(error);
	}
}

const addContactCtrl = async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body)
		if(error) throw HttpError(400, error.message)

		const result = await addContact(req.body)
		res.status(201).json(result)
	}
	catch (error) {
		next(error)
	}
}

const updateContactCtrl = async (req, res, next) => {
	try {
		const { name, email, phone } = req.body;
		if(!name && !email && !phone) throw HttpError(400, "missing fields")
		
		const { error } = contactSchema.validate(req.body)
		if (error) throw HttpError(400, error.message)
		
		const { id } = req.params;
		
		const contact = await updateContact(id, req.body)

		
		if (!contact) throw HttpError(404, `Not found`)
		res.json(contact);
 }
 catch (error) {
	 next(error);	
 }
}

const deleteContactCtrl = async (req, res, next) => {
 try {
	 const { id } = req.params;

	 const contact = await removeContact(id)
	 if (!contact) throw HttpError(404, `Not found`)
		res.json({"message": "contact deleted"});
 }
 catch (error) {
	next(error)
 }
}

module.exports = {
	getAllContactsCtrl,
	getContactByIdCtrl,
	addContactCtrl,
	updateContactCtrl,
	deleteContactCtrl,
}