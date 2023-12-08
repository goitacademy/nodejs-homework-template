<<<<<<< HEAD
const { Contact } = require("../../models/contact");
=======
const Contact = require("../../models/contact");
>>>>>>> f897728d66c7cfeaa230c21584b96a891cbf5b99

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: "200",
    data: {
      result: contactById,
    },
  });
};
module.exports = getById;