const {Contact} = require('../models/contact')

const {HttpError} = require('../helpers')
const ctrlWpapper = require('../helpers/ctrlWrapper')

const getAll = async (req, res) => { 
      const { _id: owner} = req.user;
      const {page = 1, limit = 10, favorite} = req.query;
      const skip = (page - 1)* limit;

      const searchCriteria = { owner };
       if (favorite === 'true') {
          searchCriteria.favorite = true;
      }
      const result = await Contact.find(searchCriteria, "-createdAt", { skip, limit }).populate("owner", "email");
      res.json(result)
  }

const getById = async (req, res) => {  
    const {id} = req.params
    const result = await Contact.findById(id)
    if(!result) {
      throw HttpError(404, 'Not found') 
    }
    res.json(result)
}

  const addContact =  async (req, res) => {
    const {_id: owner} = req.user;

     const result = await Contact.create({...req.body, owner})
     res.status(201).json(result)
  }

  const updateById = async (req, res) => { 
     const {id} = req.params
     const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
     if(!result) {
      throw HttpError(404, 'Not found')
     }
     res.json(result)
  }

  const updateStatusContact = async (req, res) => { 
    const {id} = req.params
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})
    if(!result) {
     throw HttpError(404, 'Not found')
    }
    res.json(result)
 }


  const deleteById = async (req, res) => {
     const {id} = req.params
     const result = await Contact.findByIdAndDelete(id)
     if(!result) {
      throw HttpError(404, 'Not found')
     }
     res.json({
      message: "contact deleted"
     })
  }
  
  module.exports = {
    getAll: ctrlWpapper(getAll),
    getById: ctrlWpapper(getById),
    addContact: ctrlWpapper(addContact),
    updateById: ctrlWpapper(updateById),
    updateStatusContact: ctrlWpapper(updateStatusContact),
    deleteById: ctrlWpapper(deleteById)
  }
