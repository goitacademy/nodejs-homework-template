const express = require('express')
const router = express.Router()
const { listContacts, getContactById, removeContact, addContact, updateContact }=require("../../model")
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    phone: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ tlds: false })
})

const findContact = async (req)=>{
	const id = Number.parseInt(req.params.contactId)
	return Number.isNaN(id) ? false : await getContactById(id)
}

router.get('/', async (req, res, next) => {
  res.json(await listContacts())
})

router.get('/:contactId', async (req, res, next) => {
	const response=await findContact(req)

	if(response) res.json(response)
		else res.status(404).json({message: "Not found"})
})

router.post('/', async (req, res, next) => {
	const {name,email,phone} = req.body

	if(schema.validate({name,email,phone}).error) res.status(400).json({message: "missing required name field"})
		else try {
			res.json({name,email,phone,id:await addContact(name,email,phone)})
		} catch(e) {res.status(501).json({message: "impossible add more contacts"})}
})

router.delete('/:contactId', async (req, res, next) => {
	const response=await findContact(req)
	
	if(response) {
		await removeContact(response.id)
		res.json({message: "contact deleted"})
	}
	else res.status(404).json({message: "Not found"})
})

router.patch('/:contactId', async (req, res, next) => {
	const {name,email,phone} = req.body
	const {contactId} = req.params

	if(schema.validate({name,email,phone}).error) res.status(400).json({message: "missing required name field"})
		else try {
			res.json({name,email,phone,id:await updateContact(Number.parseInt(contactId),name,email,phone)})
		} catch(e) {res.status(404).json({message: "Not found"})}
})

module.exports = router
