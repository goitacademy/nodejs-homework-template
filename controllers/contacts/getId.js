const { Contact } = require("../../models");

const getId = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId); //  findOne({ _id: contactId });

  if (!result) {
    const error = new Error(`Product with ${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getId;
