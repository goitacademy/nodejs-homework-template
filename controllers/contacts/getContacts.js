const repositoryContacts = require("../../repository");
const { HttpCode } = require("../../utils");

const getContacts = async (req, res, next) => {
  const contacts = await repositoryContacts.getAllContacts(req.query);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
};

module.exports = getContacts;
