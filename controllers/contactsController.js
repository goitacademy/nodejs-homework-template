const asyncHandler = require("express-async-handler");
const contactsModel = require("../models/contactsModel");
const HttpError = require("../utils/errors/HttpError");

class Contacts {
  getAll = asyncHandler(async (req, res) => {
    const allContacts = await contactsModel.find({});
    res
      .status(200)
      .json({ code: 200, data: allContacts, qty: allContacts.length });
    // res.send("getAll");
  });

  addContact = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Provide all filds!");
    }
    const contact = await contactsModel.create({ ...req.body });
    res.status(201).json({ code: 201, data: contact });
    // res.send("addContact");
  });

  // generateUniqueId = asyncHandler(async (req, res) => {
  //   // return crypto.randomBytes(8).toString("hex");
  //   const nanoid = await require("nanoid");
  //   // const id = nanoid();
  //   // console.log(id);
  //   return nanoid();
  // });

  getById = asyncHandler(async (req, res) => {
    const contact = await contactsModel.findById(req.params.id);
    res.status(200).json({ code: 200, data: contact });
    // res.send("getById");
  });

  update = asyncHandler(async (req, res) => {
    const contact = req.params.id;
    if (!contact) {
      throw new HttpError(400, res.message);
    } else {
      const updatedContact = await contactsModel.findByIdAndUpdate(req.params.id, req.params, { new: true, strict: 'throw', runValidators: true });
      if (!updatedContact) {
        console.error('Error updating contact:', error);
        throw new HttpError(500, error.message);
      }
      
      res.status(200).json({ code: 200, data: updatedContact });    
    }   
    // res.send("update");
  });

  updateContactStatus = asyncHandler(async (req, res) => {
    const contact = req.params.id;
    if (!contact) {
      throw new HttpError(404, res.message);
    } else {
      const updatedContact = await contactsModel.findByIdAndUpdate(req.params.id, req.params.favorite, { new: true, strict: 'throw', runValidators: true });
      if (!updatedContact) {
        console.error(400, res.message);
        throw new HttpError(500, res.message);
      }
      
      res.status(200).json({ code: 200, data: updatedContact });    
    }
    // res.send("updateStatus");
  });

  remove = asyncHandler(async (req, res) => {
    const contact = await contactsModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ code: 200, data: contact });
    // res.send("remove");
  });
}

module.exports = new Contacts();
