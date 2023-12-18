const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  // Если нет полей свойств у запрашиваемого объекта, то выдает сообщение(ошибку), что у запрашиваемого объекта
  //должны быть поля свойств
  if (!length) {
    return next(HttpError(400, "Body must have fields"));
  }
  next();
};

export default isEmptyBody;
