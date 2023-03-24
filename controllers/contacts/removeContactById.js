const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndDelete(id, { owner }).populate(
    "owner",
    "_id name email"
  );
  if (!result) {
    throw RequestError(404, `Contact with id=${id} not found`);
  }
  res.json({
    message: "Contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeContactById;