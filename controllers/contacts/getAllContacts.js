const { Contact } = require("../../models/contact");

const { ctrlWrapper } = require("../../decorators");

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
        skip,
        limit,
    }).populate("owner", "email subscription");
    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),

};