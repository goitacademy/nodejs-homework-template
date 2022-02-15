// created by Irina Shushkevych
const sendError = (req, res, next) => {
  const id = req.res.locals.id ?? null
  const code = req.res.locals.code ?? null
  const message = req.res.locals.message ?? null

  res.status(code || 404).json({
    status: `error`,
    code: code || 404,
    error: id ? `Contacts with id = ${id} not found` : message || 'Not found',
  })
}

module.exports = { sendError }
