const { contact: service } = require("../../service");

const addContact = async (req, res) => {
    const { _id } = req.user;
    const result = await service.addContact(req.body, _id);
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            result
        }
    });
};

module.exports = addContact;
