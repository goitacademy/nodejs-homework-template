const { Contact } = require("../../models");
const HTTP_CODS = require("../../helpers/httpCodes");

const updateStatusContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { favorite = false } = req.body;
        const updateContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
        if (!updateContact) {
            return res
                .status(HTTP_CODS.BAD_REQUEST)
                .json({
                    "message": "Not found"
                });
        }
        res
            .status(HTTP_CODS.OK)
            .json({
                updateContact
            });
    }
    catch (error) {
        next(error);
    }
};

module.exports = updateStatusContact;