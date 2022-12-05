const { contactsApi } = require("../../models");

const getAll = async (_, res) => {
    const data = await contactsApi.get();
    res.status(200).json({ status: "success",  data });
};

module.exports = getAll;