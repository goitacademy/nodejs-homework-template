const  {Contacts}  = require("../../models/contacts");
    
    const updateStatus = async (req, res) => {
        const { contactId } = req.params;
        const { favorite } = req.body;

        const updateStatusContact = await Contacts.findByIdAndUpdate(
            contactId, { favorite }, { new: true });
        
        if (!updateStatusContact) {
            res.status(404).json({
        status: "ERROR",
        code: 404,
        massage: `Contact with ID=${contactId} not found`,
        });
        return;
        }
        res.json({
            status: "Success",
            code: 200,
            message: "Contact status updated",
            data: {
                result: updateStatusContact,
            },
        });
    };

module.exports = updateStatus;