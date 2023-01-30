const { contactsApi } = require("../../models");

const getAll = async (_, res) => {
    const data = await contactsApi.get();
    res.status(200).json({ status: "success", code: 200, data });
};

module.exports = getAll;
