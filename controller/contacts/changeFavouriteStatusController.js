const {
  changeFavouriteStatusService,
} = require("../../servises/changeFavouriteStatusService");

const changeFavouriteStatusController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const data = await changeFavouriteStatusService(contactId, favorite);
  res.status(200).json({ data });
};

module.exports = changeFavouriteStatusController;
