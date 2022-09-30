const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
// const express = require('express');
// const app = express();
// const PORT = 8081;

// app.get('/home', (req, res) => {
//   res.send('get request');
// });
// app.post('/home', (req, res) => {
//   res.send('post req');
// });
// app.delete('/home', (req, res) => {
//   res.send('delete req');
// });

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}!`);
// });