const { contactsApi } = require("../../models");

const add = async (req, res) => {
    const body = req.body;
    const data = await contactsApi.add(body);
    res.status(201).json({ status: "success", data });
};

module.exports = add;