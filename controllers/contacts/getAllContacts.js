const { contact: service } = require("../../service");

const getAllContacts = async (req, res) => {
    const { _id } = req.user;
    const { page = 1, limit = 1, favorite = false } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await service.getAllContacts(_id, favorite, skip, limit);
    res.json({
        status: "success",
        code: 200,
        data: {
            result: contacts
        }
    });
};

module.exports = getAllContacts;
