const { Contact } = require('../../models/contacts');

const listContacts = async (req, res) => {
  const { _id } = req.user
  const { page = 1, limit = 10 } = req.query
  const skip = (page-1)*limit
    const contacts = await Contact.find({owner:_id},'',{skip,limit:Number(limit)});
    res.json({
      status: 'succes',
      code: 200,
      data: {
        result:contacts,
      },
    })
  
 
}

module.exports = listContacts
