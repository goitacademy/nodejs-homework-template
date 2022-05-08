const {Contact}=require('../../models/contact')

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}," name phone email favorite")
    res.json(contacts)
  } catch (error) {
    next(error)
  }
}

module.exports=getAll