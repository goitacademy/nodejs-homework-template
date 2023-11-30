const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new HttpError(404, "Not found");
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

module.exports=getContactById