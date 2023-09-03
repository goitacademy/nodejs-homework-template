const{ HttpError} = require('../../helpers');
const {Contact, JoiSchema} = require('../../models/contacts');


const updateContact = async (req, res) => {
    const { error } = JoiSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message)
    };
    
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body,{new:true});
    if (!result) {
        res.status(404).json({ "message": "Not found" })
    }
   
    res.status(200).json(result);
};

module.exports = updateContact;