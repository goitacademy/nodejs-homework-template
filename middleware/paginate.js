const mongoosePaginate = require('mongoose-paginate-v2')
const { contactSchema } = require('../models/contact')
const { Contact } = require('../../models/contact')

contactSchema.plugin(mongoosePaginate)

const options = {
  page: 1,
  limit: 20,
}

Contact.paginate({}, options, function (_err, result) {
  result.page = 1
  // result.totalPages = 10
  //   result.hasNextPage = true
  // result.nextPage = 2
  // result.hasPrevPage = false
  // result.prevPage = null
  // result.pagingCounter = 1
}).then({})
