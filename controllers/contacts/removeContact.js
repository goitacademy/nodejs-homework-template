const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
        const result = await Contact.findOneAndRemove({_id: contactId, owner});
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json({
            message: "contact deleted"
        })
};

module.exports = removeContact;
