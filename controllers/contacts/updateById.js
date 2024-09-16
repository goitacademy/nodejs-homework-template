const { HttpError, ctrlWrapper } = require("../../helpers");

const Contact = require("../../models/contact");

const updateById = async (req, res) => {
    const { contactId } = req.params;
     const { body } = req;
    const result = await Contact.findByIdAndUpdate(contactId, body, {
        new: true,
    });
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
};

module.exports = { updateById: ctrlWrapper(updateById) };