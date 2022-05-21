const service = require("../service");
const jwt=require("jsonwebtoken");

const get = async (req, res, next) => {
  try {
    const {_id}=req.user
    const result = await service.getAllContacts(_id);
    res.status(200).json({
    
        contacts: result,
    });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
};
const getContactById = async (req, res, next) => {
  try {
    const {_id}=req.user
    const result = await service.getContactById(req.params.contactId,_id);
    if(!result)
    {
      return res.status(403).json({
        "message": "Access is denied"
      })
    }
    res.status(200).json({
      contacts: result,
    });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
  }
};

const postNewContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const {authorization}=req.headers
  const [bearer, token]=authorization.split(" ");
  const owner= jwt.verify(token,process.env.SECRET_KEY).id
  
  try {
    const result = await service.postNewContact(name, email, phone, favorite,owner);
    res.status(200).json({
        contacts: result,
    });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "Not found" });
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const {_id}=req.user

    const result = await service.deleteContact(req.params.contactId,_id);
    if(result.deletedCount===0)
    {
      return res.status(403).json({
        "message": "Access is denied"
      })
    }
    res.status(200).json({
        contacts: result,
    });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
};
const updateContact = async (req, res, next) => {
  try {
    
    const { name, email, phone, favorite, } = req.body;
    const id = req.params.contactId;
    const {_id}=req.user
    const result = await service.updateContact(
      id,
      name,
      email,
      phone,
      favorite,_id
    );

    res.status(200).json({
      data: {
        contacts: req.body,
      },
    });
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
};

const updateContactFavorite = async (req, res, next) => {
  const { favorite } = req.body;
  const id = req.params.contactId;
  const {_id}=req.user

  try {
    const result = await service.updateContactFavorite(id, favorite,_id);
    if (!result.acknowledged) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    if(result.matchedCount===0)
    {
      return res.status(403).json({
        "message": "Access is denied"
      })
    }
    res.status(200).json({
      data: {
        contacts: result,
      },
    });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
const getAllFavorite = async(req, res, next)=>{
    try {
        const result = await service.getAllFavorite();
        res.status(200).json({
          data: {
            contacts: result,
          },
        });
      } catch (e) {
        res.status(404).json({ message: "Not found" });
        next(e);
      }
}

module.exports = {
  get,
  getContactById,
  postNewContact,
  deleteContact,
  updateContact,
  updateContactFavorite,
  getAllFavorite,
};
