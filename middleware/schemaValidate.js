// module.exports = (schema) => async (req, res, next) => {
//   try {
//     await schema.validate(req.body, { abortEarly: false })
//     next()
//   } catch (error) {
//     res.status(422).json(error)
//   }
// }

function schemaValidate(schema) {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false })
      next()
    } catch (error) {
      console.log(error)
      res.status(422).json(error)
    }
  }
}

module.exports = schemaValidate
