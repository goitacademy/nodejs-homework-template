

const { catchAsync } = require('../helpers/catchAsync');
const { updateStatusContact } = require('../models/contacts');

const updateStatus = catchAsync(async (req, res) => {
        const { contactId } = req.params;
        const { favorite } = req.body;
        const contactUpdateStatus = await updateStatusContact({_id: contactId}, {favorite}, { new: true })
        res.status(200).json(contactUpdateStatus);

        if (favorite === null) {
            return res.status(400).json({ message: "Missing field favorite" });
        }
});

module.exports = {
    updateStatus,
};