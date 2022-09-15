const  {Contacts}  = require("../../models/contacts");

const removeById = async (req, res) => {
    const { contactId } = req.params;
    const { _id } = req.user;
    
    const removedContact = await Contacts.findByIdAndRemove({
        owner: _id,
        _id: contactId,
    }).populate("owner", "_id email subscription avatarURL verify");
    
    if (!removedContact) {
        res.status(404).json({
        status: "ERROR",
        code: 404,
        message: `Conatct with ID=${contactId} not found`,
        });
        return;
    }
    res.json({
        status: "Success",
        code: 200,
        message: "Contact delete",
        data: {
        result: removedContact,
        },
    });
}

module.exports = removeById;