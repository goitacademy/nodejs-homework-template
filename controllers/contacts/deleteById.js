const {Contact}=require('../../models/contact')

const deleteById=async (req, res, next) => {
  try {
    const {contactId}=req.params
    const removeContact = await Contact.findByIdAndDelete(contactId)
    if(!removeContact) return res.status(404).json({
        message: `Not found`,
      })
    res.json({message: "contact deleted"})
  } catch (error) {
    next(error)
  }
  
}
module.exports=deleteById