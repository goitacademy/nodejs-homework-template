const { catchAsync } = require('../helpers/catchAsync');
const { removeContact } = require('../models/contacts');


const deleteContact = catchAsync(async (req, res) => {
        const { contactId } = req.params;
        await removeContact({_id: contactId})
        res.status(200).json(`Contact ${contactId} deleted`);
});

module.exports = {
    deleteContact,
};