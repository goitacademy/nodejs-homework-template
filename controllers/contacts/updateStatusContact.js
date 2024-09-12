const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndYpdate(contactId, req.body, { new: true, });

    if (!result) {
        throw HttpError(404, `${contactId} not found`);
    }
    res.json({ result });
};

module.exports = {
    updateStatusContact: ctrlWrapper(updateStatusContact),
};