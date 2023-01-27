const { Contact } = require("../schemas/schemas");
const { HttpError } = require("../midWare/index");

const listContacts = async (req, res) => {
        const result = await Contact.find({});
        res.json({
          status: "done",
          code: 200,
          data: { result },
        });
  }
  
  const getContactById = async (req, res) => {

        const { id } = req.params;
        const result = await Contact.findById(id);
      
        if (!result) {
          throw new HttpError(404, "Not found");
        }
      
        res.json({
          status: "done",
          code: 200,
          data: { result },
        });

  }
  
  const removeContactById = async (req, res) => {

        const { id } = req.params;
        const result = await Contact.findByIdAndRemove(id);
      
        if (!result) {
          throw new HttpError(404, "Not found");
        }
      
        res.json({
          status: "done",
          code: 200,
          data: { result },
        });
 
  }
  
  const addContact = async (req, res) => {

        const result = await Contact.create(req.body);
        res.status(201).json({ 
            status: "done", 
            code: 201, 
            data: { result } 
        });

  
  }
  

  const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
  
    if (!favorite) {
      throw new HttpError(400, `Missing field favorite`);
    }
  
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
  
    if (!result) {
      throw new HttpError(404, "Not found");
    }
  
    res.json({
      status: "done",
      code: 200,
      data: { result },
    });
  };

  const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  
    if (!result) {
      throw new HttpError(404, "Not found");
    }
  
    res.json({
      status: "done",
      code: 200,
      data: { result },
    });
  };

  module.exports = {
    listContacts,
    getContactById,
    removeContactById,
    addContact,
    updateFavorite,
    updateById,
  }