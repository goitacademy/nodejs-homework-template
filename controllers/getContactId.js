const { catchAsync } = require('../helpers/catchAsync');
// const {Contact} = require('./../models/contactModel');
const { NotFound } = require("http-errors");
const { getContactById } = require('../models/contacts');

const getContactId = catchAsync(async (req, res) => {
        const { contactId } = req.params;
        const contact = await getContactById( contactId );

        if (!contact) {
            throw new NotFound("Not found");
        }

        res.status(200).json({contact});
});

module.exports = {
    getContactId,
};
