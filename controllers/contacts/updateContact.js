const Contact = require('../../models/contact');

const updateContact = async (req,res) => {
    const id = req.params.id
    const body = req.body;
    try {
        const contact = await Contact.findByIdAndUpdate(id,body,{new:true,runValidators:true});

        if(!contact) {
            return res.status(400).json({message:'Cannot update with ID',code:400, data:contact})
        }
        return res.status(200).json({message:'Get update contact By Id',code:200, data:contact})
    } catch (error) {
        res.status(400).json({message:error.message, code:400})
    }
}



module.exports = updateContact;