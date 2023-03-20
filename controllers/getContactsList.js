const { catchAsync } = require('../helpers/catchAsync');
const { getContacts } = require('../models/contacts');

const getContactsList =  catchAsync(async (req, res) => {
    const contacts = await getContacts();
    res.status(200).json({contacts});
});

module.exports = {
    getContactsList,
};
