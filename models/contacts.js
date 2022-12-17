const {
  notFoundErrorTemplate,
} = require("../constants/responseTemplates/errorTemplates");
const {
  successTemplate,
} = require("../constants/responseTemplates/successTemplate");
const Contact = require("../services/schema");

const listContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { favorite = null, page = 0, limit = 5 } = req.query;
  let options = { owner: _id };
  if (favorite) {
    options = { ...options, favorite };
  }
  try {
    const contacts = await Contact.find(options, { __v: 0 })
      .skip(page * limit)
      .limit(limit);
    return successTemplate(res, "Success", { data: contacts });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  try {
    const contactById = await Contact.findById({ _id: contactId, owner: _id });
    if (contactById) {
      return successTemplate(res, "Success", {
        data: contactById,
      });
    } else {
      return notFoundErrorTemplate(res);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  try {
    const responce = await Contact.findOneAndRemove({
      _id: contactId,
      owner: _id,
    });
    if (responce) {
      return successTemplate(res, "Success", { data: responce });
    } else {
      return notFoundErrorTemplate(res);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { _id } = req.user;
  try {
    const responce = await Contact.create({ name, email, phone, owner: _id });
    return res.json({ data: responce, status: 201 });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const { _id } = req.user;
  try {
    const responce = await Contact.findOneAndUpdate(
      { _id: contactId, owner: _id },
      { name, email, phone }
    );
    if (responce) {
      return successTemplate(res, "Success", { data: responce });
    } else {
      return notFoundErrorTemplate(res);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;
  const { _id } = req.user;
  try {
    const responce = await Contact.findOneAndUpdate(
      { _id: contactId, owner: _id },
      { favorite }
    );
    if (responce) {
      return successTemplate(res, "Success", { data: responce });
    } else {
      return notFoundErrorTemplate(res);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
