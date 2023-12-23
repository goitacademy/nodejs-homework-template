const userController = require('./userControllers');
const contactControllers = require('./contactControllers');
const globalError = require('./errorController');

module.exports = {
	userController,
	contactControllers,
	globalError,
};
