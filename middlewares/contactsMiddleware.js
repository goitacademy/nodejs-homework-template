require("../utils/contactSchema")
const Contact = require("../utils/contactSchema")

const paginateMiddleware = (req, res, next) => {
  const { page, limit } = req.query
  // console.log(req.query)
  const options = {
    page,
    limit,
  }
  Contact.paginate({}, options, function (error, result) {
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    })
    if (error) {
      next(error)
      console.log(error)
    }
    console.log(result)
    next()
  })
}

const getOnlyFavoriteMiddleware = async (req, res, next) => {
  const { favorite } = req.query
  console.log(favorite)
  try {
    if (favorite) {
      const selectOnlyFavoriteContacts = await Contact.find({ favorite: favorite })
      res.json({
        status: "success",
        code: 200,
        data: {
          result: selectOnlyFavoriteContacts,
        },
      })
      console.log(`selectOnlyFavoriteContacts: ${selectOnlyFavoriteContacts}`)
    }

    next()
  } catch (error) {
    next(error)
    // console.log(error)
  }
}

module.exports = {
  paginateMiddleware,
  getOnlyFavoriteMiddleware,
}
