/* eslint-disable quotes */
/* eslint-disable semi */
const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updateContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true, // для возврата обновленного контакта, нужно указать этот параметр. В противном случае будет присылать старый контакт.
    }
  );
  if (!updateContact) {
    const error = new Error(
      `Can not update status contact, because id=${contactId} not found.`
    );
    error.status = 404;
    // or use package "http-errors"
    throw error;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: updateContact,
  });
};

module.exports = updateStatusContact;
