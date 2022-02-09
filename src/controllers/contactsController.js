// направить правильно запрос юзера на правильную бизнес логику
// вся бизнес логика в сервис

const { NotFound, BadRequest } = require("http-errors");

const { joiSchema } = require("../models/contactModel");
const { Contact } = require("../models");

const getContactsController = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, favorite = true } = req.query;
    const { _id } = req.user;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(
      { owner: _id, favorite },
      "-createdAt -updatedAt",
      { skip, limit: +limit }
      // skip-пропустить, limit-взять
    );
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;

    const contact = await Contact.findById(id);
    // const contact = await Contact.findOne({ _id: id });
    // findOne-возвращает {}

    if (!contact) {
      throw new NotFound();
      // throw new createError(404, "Not found");
    }

    res.json(contact);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404;
    }

    next(error);
  }
};

const addContactController = async (req, res, next) => {
  try {
    // const { name, email, phone } = req.body;
    const { error } = joiSchema.validate(req.body);

    if (error) {
      throw new BadRequest("missing required name field");
    }

    const { _id } = req.user;
    const newContact = await Contact.create({ ...req.body, owner: _id });
    // const newContact = await Contact.create(({ name, email, phone });

    res.status(201).json(newContact);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }

    next(error);
  }
};

const changeContactController = async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId: id } = req.params;

    const { error } = joiSchema.validate(body);

    if (error) {
      throw new BadRequest("missing fields");
    }

    const updateContact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    // findByIdAndUpdate-возвращает старый объект, а не новый обновленный. нужно добавить трейтий арг{new: true,}

    if (!updateContact) {
      throw new NotFound();
    }

    res.json(updateContact);
  } catch (error) {
    if (error.message.includes("Validation failed")) {
      error.status = 400;
    }

    next(error);
  }
};

const patchContactController = async (req, res, next) => {
  try {
  
    const { contactId: id } = req.params;
    const { favorite } = req.body;

 
    const updateContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      {
        new: true,
      }
    );
    
    if (!updateContact) {
      throw new NotFound();
    }

    res.json(updateContact);
  } catch (error) {
    if (error.message.includes("missing field favorite")) {
      error.status = 400;
    }

    next(error);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;

    const deleteContact = await Contact.findByIdAndRemove(id);
   

    if (!deleteContact) {
      throw new NotFound();
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

    module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  patchContactController,
  deleteContactController,
};
