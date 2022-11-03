const {Contact} = require('../../models/contact')

const add =  async (req, res, next) => {
    const user = req.user
    const result = await Contact.create({...req.body, owner:user._id}, {new: true})
    res.status(201).json(result) 
  }

module.exports = add