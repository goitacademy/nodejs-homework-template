const service = require("../service");

const get = async (req, res, next) => {
  try{
    const results = await service.getAllContacts();
    res.json({
      status: "Success",
      code: 200,
      data: {
        contacts: results,
      }
    })
  }
  catch(err){
    console.err(err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params; 
  try{
    const results = await service.getContactById(id);
    if(results){
      res.json({
        status: "Success",
        code: 200,
        data: {
          data: results,
        }
      })
    }else{
      res.status(404).json({
        status: "Error",
        code: 404,
        message: "Contact Not Found",
      })
    }
  }
  catch(err){
    console.error(err);
    next(err);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body; 
  try{
    const results = await service.createContact({name, email, phone, favorite});
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact: results,
      }
    })
  }
  catch(err){
    console.error(err);
    next(err);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;  
  try {
    const result = await service.updateContact(id ,{name, email, phone, favorite})
    if(result){
      res.json({
        status: "success",
        code: 200,
        data: {contact: result}
      })
    }else{
      res.status(404).json({
        status: "error",
        code: 404,
        message: 'Contact not update'
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.removeContact(id);
    if(result){
      res.json({
        status: "Success",
        code: 200,
        data: {contact: result}
      })
    }else{
      res.status(404).json({
        status: "Error",
        code: 404,
        message: "Contact no eliminado"
      })
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  try {
    if (favorite === undefined) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing field favorite`,
        data: "Not found",
      });
      return;
    }
    const result = await service.updateContact(id, {
      favorite,
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact not found by id ${id}`,
        data: "Not found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  updateFavorite
}