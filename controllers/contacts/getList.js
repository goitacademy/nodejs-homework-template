const { Contact } = require("../../models/contact")

const getList = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, ...filter } = req.query;
    const skip = (page - 1)* limit;
    const result = await Contact.find({ owner, ...filter }, "-createdAt -updatedAt", { skip, limit })
        .populate("owner", "email subscription");
    res.json(result);
}

module.exports = getList;
