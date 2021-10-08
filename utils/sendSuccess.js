const contacts = (res, results, message = '', status = 200) => {
  res.status(status).json({
    message: `${status}OK.` + message,
    results,
  })
}

const users = (res, user, status = 200) => {
  res.status(status).json({
    user,
  })
}

module.exports = { contacts, users }
