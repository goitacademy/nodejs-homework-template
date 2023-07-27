const { Contact } = require("../../models/book");

const {HttpError} = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) {
        throw HttpError(404, `${contactId} not found`);
    }
    res.json({ message: "Delete success" });
};

module.exports = {
    deleteContact: ctrlWrapper(deleteContact),
};