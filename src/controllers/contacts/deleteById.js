const { Contact } = require("../../models/contacts");
const { requestError } = require("../../helpers/requestError");

const deleteById = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        // Use findOneAndRemove() instead of findByIdAndRemove() 
        const result = await Contact.findOneAndRemove(contactId);

        if (!result) {
            throw requestError(404, "Not found");
        }
        res.json({
            status: "success",
            code: 200,
            message: "Contact deleted successfully",
            data: { result },
        });
    } catch (error) {
         // Error handling 
        next(error);
    }
};

module.exports = deleteById;
