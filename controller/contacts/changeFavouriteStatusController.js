const {
  changeFavouriteStatusService,
} = require("../../servises/changeFavouriteStatusService");

const changeFavouriteStatusController = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const { favorite } = req.body;

  const data = await changeFavouriteStatusService(contactId, favorite, _id);
  res.status(200).json({ data });
};

module.exports = changeFavouriteStatusController;
