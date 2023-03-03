const { Contact } = require("../../models/contact");
const { customError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const contact = await Contact.findOne(
    { _id: id, owner: _id },
    "-createdAt -updatedAt"
  ).populate("owner", "_id name email");
  if (!contact) {
    throw customError(`contact whith id = ${id} not found`, 404);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = getById;
