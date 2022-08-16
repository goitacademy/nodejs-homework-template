const express = require('express');
const { dashboard: ctrl } = require('../../controllers');
const { auth, ctrlWrapper, validation } = require('../../middlewares');
const { joiCustomerSchema } = require('../../models/user');

const router = express.Router();

router.get('/', auth(["ADMIN", "MODERATOR", "EDITOR"]), ctrlWrapper(ctrl.getAllCustomers));

router.get('/:customerId', auth(["ADMIN", "MODERATOR", "EDITOR"]), ctrlWrapper(ctrl.getCustomerById));

router.post('/', auth(["ADMIN", "MODERATOR"]), validation(joiCustomerSchema), ctrlWrapper(ctrl.addCustomer));

router.put('/:customerId', auth(["ADMIN", "MODERATOR", "EDITOR"]), validation(joiCustomerSchema), ctrlWrapper(ctrl.updateCustomer));

router.delete('/:customerId', auth(["ADMIN", "MODERATOR"]), ctrlWrapper(ctrl.deleteCustomer));

module.exports = router;
