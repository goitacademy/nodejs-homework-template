const { contactsApi } = require("../../models");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
    const { contactId } = req.params;
    const data = await contactsApi.getById(contactId);
    if (!data) {
        throw RequestError(404, `id:${contactId} not found`);
    }
    res.status(200).json({ status: "success", code: 200, data });
};

module.exports = getById;
