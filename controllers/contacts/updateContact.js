const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contacts = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contacts) {
    throw new HttpError(404, "Not found");
  }

  res.send(contacts);
};

module.exports = updateContact;
