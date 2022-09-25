const { Contact } = require("../../models");
const {RequestError} = require("../../helpers");

const updateStatusContact = async(req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    
    if (!result) {
         throw RequestError(404, `User with ${contactId} not found !`);
    };
     res.json({
        status: "success",
        code: 200,
        data: result
    })
};

module.exports = updateStatusContact;