const fs = require('fs').promises;

const { catchAsync, HttpError } = require('../utils');

exports.checkUserId = catchAsync(async (req, res, next) => {
	const { contactId } = req.params;

	if (contactId.length < 15) throw new HttpError(400, 'Invalid ID!');

	const usersDB = await fs.readFile('./models/contacts.json');

	const users = JSON.parse(usersDB);
	const user = users.find((item) => item.id === contactId);

	if (!user) throw new HttpError(404, 'User does not exist!');

	req.user = user;

	next();
});
