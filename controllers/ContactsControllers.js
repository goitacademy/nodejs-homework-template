const { Contact } = require('../middleware/mongooseSchema');

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}, "-__v");
    res.json(contacts);
  } catch (error) {
    next(error)

  }
}

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOne({ _id: contactId }, "-__v");
   
    if (!result) {     
      return res.status(404).json({
        status: "error",
        code: 404,
        massage: `Contacts with id = ${contactId} not found`
      })
    }
    return res.status(200).json(result)

  } catch (error) {
    next(error)
  }

};

const createContacts = async (req, res, next) => {
  try {

    const result = await Contact.create(req.body);
    return res.status(201).json(result)

  } catch (error) {
    next(error);
  }

};

const deleteContacts = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      return res.status(404).json({
        status: "error",
        code: 404,
        massage: `Contacts with id = ${contactId} not found`
      })
    }
    return res.status(200).json(result)
  } catch (error) {

  }
};

const updateContact = async (req, res, next) => {
  try {

    const { contactId } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!updateContact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        massage: `Contacts with id = ${contactId} not found`
      })
    }
    return res.status(200).json(updateContact)

  } catch (error) {
    next(error);

  }
};

const updateStatusContact = async (req, res, next) => {
  try {

    const { contactId } = req.params;
    const {favorite} = req.body;
    const updateContact = await Contact.findByIdAndUpdate(contactId, {favorite}, { new: true });
    if (!updateContact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        massage: `Contacts with id = ${contactId} not found`
      })
    }
    return res.status(200).json(updateContact)

  } catch (error) {
    next(error);

  }
}
  

module.exports = {
  getAll,
  getById,
  createContacts,
  deleteContacts,
  updateContact,
  updateStatusContact

}