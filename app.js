// const express = require('express')
// const logger = require('morgan')
// const cors = require('cors')

// const contactsRouter = require('./routes/api/contacts')

// const app = express()

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
// app.use(cors())
// app.use(express.json())

// app.use('/api/contacts', contactsRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })

// module.exports = app

// const arr = [{id:1, price: 100, voice: a },{id:2, price: 350, voice: b },{id:3, price: 50, voice: b }]
// // console.log(arr)

// const i = {id:1, price: 100, voice: a }

// for(let i = 0; i<=arr.length; i++){
//   for( let key in i ){
//     console.log(key)
//     if(key.voice === a){
//      resultA = key.price;
//       console.log(resultA)
//       continue;
//     }
//     resultB = key.price
//     console.log(resultB)

//   }
// }


