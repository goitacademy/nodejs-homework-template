const Contact = require('../../models/contact');

const removeContact = async (req,res) => {
    const id = req.params.id
    try {
        const contact = await Contact.findByIdAndDelete(id);
        if(!contact) {
            return res.status(400).json({message:'Cannot remove with ID',code:400, data:contact})
        }
        return res.status(200).json({message:'Get remove contact By Id',code:200, data:contact})
    } catch (error) {
        res.status(400).json({message:error.message, code:400})
    }
}

module.exports = removeContact;