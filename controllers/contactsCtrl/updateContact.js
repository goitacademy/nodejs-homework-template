const{ HttpError} = require('../../helpers');
const {Contact, joiSchema} = require('../../models/contacts');


const updateContact = async (req, res) => {
    const { error } = joiSchema.validate(req.body);
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