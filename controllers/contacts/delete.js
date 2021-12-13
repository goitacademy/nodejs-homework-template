const delelteContact = async (req, res, next) => {
    try { 
      const {contactId} = req.params
      const result = await removeContact(contactId)
  
      if (!result) {
        const error = new Error (`contact with ${contactId} not found`)
        error.status = 404;
        throw error;
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result
        }
      })
     
     } catch (error) {
          next(error)
     }
  }

  module.exports = delelteContact