const { Contact } = require("../../models");
const service = require("../../service");
const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner, favorite: favorite ?? [true, false] },
    null,
    {
      skip,
      limit: parseInt(limit),
    }
  ).populate("owner", "_id email");
  service.CheckByError(!result, 404, "Not found");
  res.status(200).json(result);
};
module.exports = service.ctrlWrap(getContacts);
