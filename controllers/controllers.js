const {Contact} = require("../models/contact");
const { httpError } = require("../helpers");
const contactPush = require("../schemas/joi");
const {ctrlWrapper}=require('../helpers')

const getContactRoute = async (req, res ) => {
    const result = await Contact.find({},"name email phone");
    res.json(result);

};

const getContactRouteByID = async (req, res ) => {
    const { contactId } = req.params;
    const contactById = await Contact.findById(contactId);
    if (!contactById) {
      throw httpError(404);
    }
    res.json(contactById);

};

const postContactRoute = async (req, res) => {
    const { error } = contactPush.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);

};

// const deleteContactRoute = async (req, res, ) => {

//     const { contactId } = req.params;
//     const result = await operations.removeContact(contactId);
//     if (!result) {
//       throw httpError(404);
//     }
//     res.json({ message: "contact deleted" });
// };

const putContactRoute = async (req, res) => {
    const { error } = contactPush.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId,req.body,{new:true})
    if (!result) {
      throw httpError(404);
    }
    res.json(result);

};

module.exports = {
  getContactRoute:ctrlWrapper(getContactRoute),
  getContactRouteByID:ctrlWrapper(getContactRouteByID),
  postContactRoute:ctrlWrapper(postContactRoute),
  // deleteContactRoute:ctrlWrapper(deleteContactRoute),
  putContactRoute:ctrlWrapper(putContactRoute),
};
