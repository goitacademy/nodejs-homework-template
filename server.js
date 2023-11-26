const app = require('./app')

// const contacts = require('./models/contacts.json')

// app.use((req, res, next) => { 
//   console.log('aaaaa')
//   next()
// })

// app.get('/', (request, response) => { 
//   response.send(console.log(request.url))
// })

// app.get('/contacts', (request, responce) => { 
//   responce.json(contacts)
// })

// app.use((req, res)=> {
//   // console.log(res)
//   res.status(404).json({
// 		message: "Not found"
// 	})
// })

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
