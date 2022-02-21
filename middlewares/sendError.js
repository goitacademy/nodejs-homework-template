// created by Irina Shushkevych
const sendError = (err, req, res, next) => {
  const id = err.id ?? null
  const code = err.status ?? 500
  const message = id 
      ? `Contacts with id = ${id} not found` 
      : err.message || 'Server error'

  res.status(code).json({
    status: `error`,
    code,
    error:{ message } 
  })
}

module.exports = { sendError }
