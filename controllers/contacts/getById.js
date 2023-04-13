
const createError = require('http-errors');
const {getContactById} = require('../../models/contacts')

const getByIdController = async (req, res) => {
	
		const {id} = req.params;
		console.log('ID',req.params);
		const contact = await getContactById(id);
		console.log('CONTACT====>', contact);
		if(!contact){
			throw createError(404, `user with id=${id} not found`) // с плагином
			// const error = new Error(`user with id=${contactId} not found`); // без плагина
			// error.status = 404;
			// throw error;
		}
		console.log('RES====>', contact);
	  res.json({ 
				status: "success",
				code: 200,
				data: {
					result: contact,
				}
	  })

}

module.exports = getByIdController;