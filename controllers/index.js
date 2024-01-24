const userController = require('./userControllers');
const contactControllers = require('./contactControllers');
const globalError = require('./errorController');
const viewControllers = require('./viewControllers');

module.exports = {
	userController,
	contactControllers,
	globalError,
	viewControllers,
};
