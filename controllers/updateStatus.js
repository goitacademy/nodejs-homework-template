const {Contact} = require('./../models/contactModel');
const { schema } = require('../helpers/validations');

const updateStatus = async (req, res) => {
    try {
        const validationResult = schema.validate(req.body);
        if(validationResult.error) {
            return res.status(400).json("missing fields");
        }

        const { contactId } = req.params;
        const { favorite } = req.body;
        const contactUpdateStatus = await Contact.findByIdAndUpdate({_id: contactId}, {favorite}, { new: true })
        res.status(200).json(contactUpdateStatus);

        if (favorite === null) {
            return res.status(400).json({ message: "Missing field favorite" });
        }
        
    } catch (err) {
        res.status(404).json({"message": "Not found"});
    }
};

module.exports = {
    updateStatus,
};