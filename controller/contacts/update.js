const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const update = async (req, res) => {
    const { contactId } = req.params;
    const body = req.body;
    const data = await Contact.findByIdAndUpdate(contactId, body, { new: true });

    if (!data) {
        throw RequestError(404, `id:${contactId} not found`);
    }

    res.status(200).json({ status: "success", code: 200, data });
};

module.exports = update;
