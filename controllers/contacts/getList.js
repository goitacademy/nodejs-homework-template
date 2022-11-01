const { Contact } = require("../../models/contact")

const getList = async (req, res) => {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
}

module.exports = getList;