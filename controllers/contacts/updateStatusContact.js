const Contact = require('../../models/contact');

const updateStatusContact = async (req, res) => {

    if (Object.keys(req.body).length == 0) {
    return res.json({
        status: 400,
        message: "missing field favorite"
      })
  } 
  
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    result.favorite = req.body.favorite;
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found...`)
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
}

module.exports = updateStatusContact;