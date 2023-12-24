const { Contact } = require("../../models");
const { HttpError } require("../../helpers");

const updateContact = async(req, res, next) => {
   try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req,body, {
        new: true,
    });
    if(!result) {
        throw HttpError(404, "Not found");
    };
    res.status(201).json(result);
   } catch (error) {
        next(error);
   }
};

module.exports = updateContact;