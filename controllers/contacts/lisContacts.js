
const {listContacts } = require('../../models/contacts');

const listController = async (req, res, next) => {


		const contacts = await listContacts();
console.log("DATA2===>",contacts);
  res.json({
		status: 'success',
		code: 200,
		data: {
			result: contacts,
		}
  });
}



module.exports = listController;
