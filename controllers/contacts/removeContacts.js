const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw new HttpError(404, "Not found");
  }
  res.json({
    message: "delete success",
  });
};

module.exports = removeContact;
