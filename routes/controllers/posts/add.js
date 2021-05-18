const add = (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    res.json({
      status: "success",
      code: 201,
      data: await contacts.addContact(req.body),
    })
  }catch (error) {
    res.json({
      status: "fail",
      code: 400,
      error: error.message,
    })
    next(error);
  }
}

module.exports = add;