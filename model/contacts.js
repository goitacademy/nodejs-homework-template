// [{"id":1,"name":"Allen Raymond","email":"nulla.ante@vestibul.co.uk","phone":"(992) 914-3792"},{"id":2,"name":"Chaim Lewis","email":"dui.in@egetlacus.ca","phone":"(294) 840-6685"},{"id":3,"name":"Kennedy Lane","email":"mattis.Cras@nonenimMauris.net","phone":"(542) 451-7038"},{"id":4,"name":"Wylie Pope","email":"est@utquamvel.net","phone":"(692) 802-2949"},{"id":5,"name":"Cyrus Jackson","email":"nibh@semsempererat.com","phone":"(501) 472-5218"},{"id":6,"name":"Abbot Franks","email":"scelerisque@magnis.org","phone":"(186) 568-3720"},{"id":7,"name":"Reuben Henry","email":"pharetra.ut@dictum.co.uk","phone":"(715) 598-5792"},{"id":8,"name":"Simon Morton","email":"dui.Fusce.diam@Donec.com","phone":"(233) 738-2360"},{"id":9,"name":"Thomas Lucas","email":"nec@Nulla.com","phone":"(704) 398-7993"},{"id":10,"name":"Tomas Torland","email":"Donec.elementum@scelerisquescelerisquedui.net","phone":"(748) 206-2688"},{"name":"Tomas Torland","email":"ddd@gmail.com","phone":"4555","id":53},{"name":"Tomas Torland","email":"ddd@gmail.com","phone":"94","id":45},{"name":"Tomas Torland","email":"ddd@gmail.com","phone":"(748) 206-2687","id":4},{"name":"Tomas Torland","email":"ddd@gmail.com","phone":"(748) 2062168","id":69},{"name":"Tomas Torland","email":"ddd@gmail.com","phone":"748 2062168","id":15},{"name":"Tomas Torland","email":"ddd@gmail.com","phone":"+380962062168","id":91},{"name":"Tomas Torland","email":"ddd@gmail.com","phone":"0962062168","id":88},{"name":"Tomas Torland","email":"ddd@gmail.com","phone":"966206216","id":65},{"name":"Tomas Torland","email":"ddd@gmail.com","phone":"96620626","id":92},{"name":"Tomas Torland","email":"ddd@gmail.com","phone":"0976206126","id":13},{"name":"Tomas Torland","email":"ddd@gmail.com","phone":"0976201126","id":5},{"name":"MAKSIM","email":"max@gmail.com","phone":380970502123,"id":42}]
const mongoose = require('mongoose')
require('dotenv').config()

const uriDb = process.env.URL_DB
const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5,
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose error: ${err.message}`)
})

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Connection to BD closed and app termination')
    process.exit(1)
  })
})

module.exports = db
