const {
  getAllContactsService,
} = require("../../servises/getAllContactsService");

const getAllContactsController = async (_, res) => {
  const data = await getAllContactsService();
  res.status(200).json({ data });
};

module.exports = getAllContactsController;
