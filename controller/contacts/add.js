const { Contact } = require("../../models");

const add = async (req, res) => {
    const body = req.body;
    const data = await Contact.create(body);
    res.status(201).json({ status: "success", code: 201, data });
};

module.exports = add;
