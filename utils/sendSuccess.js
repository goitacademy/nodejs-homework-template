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
const avatar = (res, avatarURL, status = 200) => {
  res.status(status).json({
    avatarURL,
  })
}

module.exports = { contacts, users, avatar }
