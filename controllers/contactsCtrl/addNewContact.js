const contactsOperations = require('../../models/contacts');

const contactSchema = require('../../schemes/contactSchema');

const addNewContact = async (req, res, next) => {
    try {
        const {error} = contactSchema.validate(req.body);
            if(error) {
                return res.status(400).json({message:"missing required name field"})
            }
            
        const {name, email, phone} = req.body;
        const newContact = await contactsOperations.addContact(name, email, phone);
    
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result: newContact
            }
        });
    } catch (error) {
        next(error);
    }
  }

module.exports = addNewContact;