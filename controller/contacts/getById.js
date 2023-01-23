const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
    const { contactId } = req.params;
    const { id: userId } = req.user;
    const data = await Contact.findOne({ _id: contactId, owner: userId });
    if (!data) {
        throw RequestError(404, `id:${contactId} not found`);
    }
    res.status(200).json({ status: "success", code: 200, data });
};

module.exports = getById;
