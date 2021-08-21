const app = require('../app')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})

// const app1 = require('../model/contacts/removeContact');
// console.log(app1(11));
