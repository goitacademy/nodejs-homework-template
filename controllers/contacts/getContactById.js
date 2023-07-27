const { Contact } = require("../../models/book");

const { HttpError } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const getContactById = async (req, res) => {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId);
    if (!result) {
        throw HttpError(404, `${contactId} not found`);
    }
    res.json(result);
};

module.exports = {
    getContactById: ctrlWrapper(getContactById),
};