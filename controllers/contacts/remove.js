<<<<<<< HEAD
const { Contact } = require("../../models/contact");
=======
const Contact = require("../../models/contact");
>>>>>>> f897728d66c7cfeaa230c21584b96a891cbf5b99

const remove = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: "delete success",
    code: "204",
    data: {
      result: deletedContact,
    },
  });
};

module.exports = remove;