const fs = require('fs').promises
const path = require('path')
const contactsPath = path.basename("D:/nodejs-homework-rest-api/contacts.json")
const { v4 } = require('uuid')
const Joi = require('joi')

const contactsSchema = Joi.object({
	name: Joi.string().min(2).required(),
	phone: Joi.string(),
	email: Joi.string().min(5).required(),

})

const add = async (req, res) => {

	const { error } = contactsSchema.validate(req.body)
	if (error) {
		res.status(400).json({status: error, code: 400, message: error.details[0].message})
	}

	const file = await fs.readFile(contactsPath, 'utf8')
	const contacts = await JSON.parse(file)
	const newContact = {
		id: v4(),
		...req.body
	}
	await contacts.push(newContact)
	console.log(contacts);
	await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8', error => {
		if (error) {
		console.log(error);
		}
	})
	res.status(201).json({
		status: 'success', code: 201, data: {
		result: newContact,
	} })
}



module.exports = add