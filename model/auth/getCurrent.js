const getCurrent = async ({ email, subscription }) => {
  try {
    return { email, subscription }
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = { getCurrent }
