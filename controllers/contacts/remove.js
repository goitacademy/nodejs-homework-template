
const remove = async (req, res, next) => {
  
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw RequestError(404, 'Not found')
  }
  res.json(result)
 
}