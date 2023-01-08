const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const patch = async (req, res) => {
    const { contactId } = req.params;
    const body = req.body;
    const { id: userId } = req.user;
    const data = await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, body, {
        new: true,
    });

    if (!data) {
        throw RequestError(404, `id:${contactId} not found`);
    }

    res.status(200).json({ status: "success", code: 200, data });
};

module.exports = patch;
