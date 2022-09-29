const { contactsServices } = require("../../services");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await contactsServices.getAll(_id, skip, limit);
  res.status(200).json({
    status: "success",
    code: "200",
    payload: { result: contacts },
  });
};

module.exports = getAll;
