const { Contact } = require("../models/contact");
const { schemas } = require("../models/contact");

const { HttpError } = require("../helpers/index");

const getAll = async (req, res, next) => {
  try {
// Извлекаем идентификатор владельца (пользователя) из объекта запроса
const { _id: owner } = req.user;

// Извлекаем значения параметров "page" и "limit" из строки запроса
const { page = 1, limit = 20 } = req.query;

// Рассчитываем значение "skip" для использования в запросе к базе данных
const skip = (page - 1) * limit;

// Ищем контакты, принадлежащие данному владельцу, с учетом пагинации
// Используем метод populate для связывания с данными владельца (name и email)
const result = await Contact.find({ owner }, null, { skip, limit }).populate("owner", "name email");


    //!если бы нам нужно было вернуть не все поля, а конкретные то сделали бы так:
    // const result = await Contact.find({}, "name favorite"), а еще без какогото то ставим "-" перед названием
    res.json(result);
    // console.table(result)
  } catch (error) {
    next(error); //Express ищет не простo следующий обработчик, а именнo обработчик ошибок. В нашем случае это хранщаяся в файле app.js последняя middleware
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(req.params);
    //const result = await Contact.findOne ({_id: contactId})// используется для поиска всего, кроме айди как парвило
    const result = await Contact.findById(contactId); //используется для поиска по id
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body); //проверяем на соответствие требованиям, указанным в схеме
    console.log("error:", error);
    if (error) {
      // если по схеме ошибка в получаемых данных, то выбрасываем ошибку
      throw HttpError(400, error.message);
    }
    // console.log(req.body)
    // console.log(req.params)
    // console.log(req.)

    //! Теперь каждый контакт будет записан за конкретным человеком
// Извлекаем _id из объекта req.user и присваиваем его переменной owner.
const {_id: owner} = req.user;
// Создаем новый контакт, объединяя данные из req.body и устанавливая owner
const result = await Contact.create({...req.body, owner});

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    //идентично было бы: const result = await Contact.findByIdAndRemove(contactId)
    console.log(result);
    if (!result) {
      //если результат null
      throw HttpError(404, "Not Found");
    }
    res.json({
      message: "Delete success",
    });
    console.table("result", result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    console.log("req.params:", req.params);
    console.log("error:", error);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      //если результат null т.е. нет номера с таким id
      throw HttpError(404, "Not Found");
    }
    res.json(result);
    console.log("result", result);
  } catch (error) {
    next(error);
  }
};

// !частичное обновление (толькое favorite)
const updateFavorite = async (req, res, next) => {
  try {
    if (!req.body || !req.body.favorite) {
      throw HttpError(400, "missing field favorite");
    }

    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    console.log("error:", error);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const { favorite } = req.body;
    
    const result = await Contact.findByIdAndUpdate(contactId, favorite, {
      new: true,
    });
    if (!result) {
      //если результат null т.е. нет номера с таким id
      throw HttpError(404, "Not Found");
    }
    res.json(result);
    console.log("result", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
};
