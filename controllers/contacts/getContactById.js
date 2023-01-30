const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  //   const contactById = await Contact.findOne({ _id: contactId });
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactById,
    },
  });
};
module.exports = getContactById;
