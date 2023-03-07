const { Contact } = require("../../models/contact");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  if (!contactId) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  const result = await Contact.deleteOne({ _id: contactId });
  console.log(result);
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
    message: "contact deleted",
  });
};

module.exports = deleteContact;
