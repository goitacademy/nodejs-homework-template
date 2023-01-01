const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
        const result = await Contact.findOne({_id: contactId, owner});

        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json(result);
};

module.exports = getContactById;
