const Contact = require('../../models/contact');

const addContact = async (req,res) => {
    try {
        const book = await Contact.create(req.body);
        return res.status(201).json({message:'Add book success',code:201, data:book})
    } catch (error) {
        res.status(400).json({message:error.message, code:400})
    }
}

module.exports = addContact;