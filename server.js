// const app = require('./app')

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
const express = require('express');
const contacts = require('./models/contacts.json')

const app = express(); // app - web server

app.use((req, res, next)=>{
  console.log('My first middleware');
  next();
})

app.set('json spaces', 4)

app.get('/', (request, response) => {
  // console.log(request.url)
  console.log(request.method)
  response.send('<h2>Home Page</h2>');

});

app.get('/contacts', (request, response) => {
  console.log(request.url)
  console.log(request.method)
  response.json(contacts);
});

app.get('')

app.listen(3000, () => console.log('Server running!'));
