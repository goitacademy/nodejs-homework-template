const {Contacts} = require("../../models/contacts");

const getById = async (req, res) => {
    const { contactId } = req.params;
    const { _id } = req.user;

    const contact = await Contacts.findOne({
        owner: _id,
        _id: contactId,
    }).populate("owner", "_id email subscription avatarURL verify");
    
    if (!contact) {
        res.status(404).json({
        status: "ERROR",
        code: 404,
        message: `Contact with ID=${contactId} not found`,
        });
        return;
    }
    res.json({
        status: "Success",
        code: 200,
        data: {
        result: contact,
        },
    });
}

module.exports = getById;