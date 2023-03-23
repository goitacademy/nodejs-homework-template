const { Contact } = require('../../models');
const { catchAsync } = require('../../utils');

const removeContact = catchAsync (async (req, res) => {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).json({"message": "contact deleted"});
});

module.exports = removeContact;