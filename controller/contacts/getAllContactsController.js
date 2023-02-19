const {
  getAllContactsService,
} = require("../../servises/getAllContactsService");

const getAllContactsController = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  const data = await getAllContactsService(_id);
  res.status(200).json({ data });
};

module.exports = getAllContactsController;
