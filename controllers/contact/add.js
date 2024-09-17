const Contacts = require('../../models/contact/contactsSchema')

const add = async (req, res, next) => {
    try {
        const newContact = {
            ...req.body,
            owner: req.user
        };
    await Contacts.create(newContact);

    res.status(200).json({ "message": "contact create" });
        
    } catch (err) {
        next(err);
    }
  
};

module.exports = add;