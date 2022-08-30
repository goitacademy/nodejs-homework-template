const  {Contacts}  = require("../../models/contacts");

const updatebyId = async (req, res) => {
    const { contactId } = req.params;
    const updateContact = await Contacts.updateContact(contactId,req.body);
    if (!updateContact) {
        res.status(404).json({
        status: "ERROR",
        code: 404,
        message: `Contact with ID=${contactId} not found`,
        });
        return
    }
    res.json({
        status: "Success",
        code: 200,
        message: "Contact updated",
        data: {
        result: updateContact,
        },
    });
    }


module.exports = updatebyId;