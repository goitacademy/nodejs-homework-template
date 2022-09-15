const  {Contacts}  = require("../../models/contacts");
    
    const updateStatus = async (req, res) => {
        const { contactId } = req.params;
        const { favorite } = req.body;
        const { _id } = req.user;

        const updateStatusContact = await Contacts.findByIdAndUpdate(
            {
                owner: _id,
                _id: contactId,
            },
            { favorite }, { new: true }
        ).populate("owner", "_id email subscription avatarURL verify");
        
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