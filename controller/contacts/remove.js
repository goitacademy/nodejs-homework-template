const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const remove = async (req, res) => {
    const { contactId } = req.params;
    const { id: userId } = req.user;
    const data = await Contact.findOneAndDelete({ _id: contactId, owner: userId });

    if (!data) {
        throw RequestError(404, `id:${contactId} not found`);
    }

    res.status(200).json({ status: "success", code: 200, message: "contact deleted" });
};

module.exports = remove;
