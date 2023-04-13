

const {addContact} =require('../../models/contacts');

const validateSchema = require('../../utils/schema');

const addController =  async (req, res, next) => {
	try {
		const {error} = validateSchema.validate(req.body);
		if(error){
			error.status = 400;
			throw error;
		}
		const newContact = await addContact(req.body);
  		res.status(201).json({ 
			status: 'success',
			code: 201,
			data: {
				result: newContact,
			}
		 })
		
	} catch (error) {
		next(error);
		
	}

	
}

module.exports = addController;