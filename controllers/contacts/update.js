const update = async (req, res, next) => {
  
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw RequestError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body)
    if (!result) {
     throw RequestError(404, 'Not found')
    }
    res.json(result)
  
}