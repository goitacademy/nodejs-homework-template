const sendError = (req, res, next) => {
  const id = req.res.locals.id
  res.status(404).json({
    status: `error`,
    code: 404,
    error: id ? `Contacts with id = ${id} not found` : 'Not found',
  })
}

module.exports = { sendError }
