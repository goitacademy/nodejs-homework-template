const { Contact } = require("../../models/contacts");

const updateStatusContact = async (id, body) => {
  if (body === undefined || body.favorite === undefined) {
    throw new Error("missing field favorite");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite: body.favorite },
    { new: true }
  );

  if (!updatedContact) {
    return null;
  }

  return updatedContact;
};

module.exports = updateStatusContact;
