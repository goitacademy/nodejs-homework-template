// const mongoose = require("mongoose");

// const app = require("./app");

// const { MONGO_URL, PORT = 3000 } = process.env;
// mongoose.set("strictQuery", true);

// mongoose
//   .connect(MONGO_URL)
//   .then(() =>
//     app.listen(PORT, () => {
//       console.log("Database connection successful");
//     })
//   )
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });


const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? './environments/production.env.example' : './environments/development.env',
});

// const { SENDGRID_APIKEY } = process.env;

// sgMail.setApiKey(SENDGRID_APIKEY);

// const email = {
//   to: 'resiva3110@touchend.com',
//   from: 'userandrii@meta.ua',
//   subject: 'Test email',
//   html: '<p><strong>Test mail</strong> from localhost:3000</p>',
// };

// sgMail.send(email)
//   .then(() => console.log("Email send success!"))
//   .catch(error => console.log(error.message));

const contactRoutes = require('./routes/api/contactsRoutes');
const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URL).then((con) => {
  console.log('Mongo DB successfully connected!');
}).catch((error) => {
  console.log(error);

  process.exit(1);
});


//MIDLEWARES
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//custom general middleware to sign time string to re object
app.use((req, res, next) => {
  req.time = new Date().toLocaleString('uk-UA');

  next();
});

//Routes

app.use('/contacts', contactRoutes);

app.get('/ping', (req, res) => {
  res.status(200).json({
    message: 'pong!',
  });
});

//Not found request handler
app.all('*', (req, res) => {
  res.status(404).json({
    message: 'Oops! Resours not found...',
  });
});

//Global error handler. Rour arguments required!
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});
// // custom middleware to find by id
// app.use('/contacts/:id', async(req.res, next) => {
//   try {
//     const { id } = req.params;

//     const contacts = JSON.parse(await fs.readFile('contacts.json'));

//     const contact = contacts.find((item) => item.id === id);

//     if(!contact) {
//       return res.status(404).json({
//         message: 'Contact does not exist..',
//       });
//     }

//     req.contact = contact;

//     next();

//   } catch(error) {
//     console.log(err);

//     res.sendStatus(500);
//   }
// });
// //CONTROLLERS

// app.post('/contacts', async (req, res) => {
//   try {
//     const { id, name, email, phone } = req.body;

//     //validation

//     //create new contact 
//     const newContact = {
//       id,
//       name,
//       email,
//       phone
//     };

//     //Get contacts list
//     app.get('/contacts', async (req, res) => {
//       try {
//         const contacts = Json.parse(await fs.readFile('contacts.json'));

//         res.status(200).json({
//           message: 'Success',
//           contacts,
//         });
//       } catch (error) {
//         console.log(error);

//         res.sendStatus(500);
//       }
//     });

//     //Get contacts by id
//     app.get('/contacts/:id', (req, res) => {
//       const { contact } = req;
//       const { id } = req.params;
//       const contacts = Json.parse(await fs.readFile('contacts.json'));

//       const contact = contacts.find((item) => item.id === id);
//       res.status(200).json({
//         message: 'Success',
//         contact,
//       });
//     });

//     //Update contact by id

//     app.patch('/contacts/:id', async (req, res) => {
//       try {
//         const { contact } = req;
//         const { name, phone } = req.body;
//         //update contact data
//         //get all contacts from DB
//         //overwrite contact with new data
//         res.status(200).json({
//           message: 'Success',
//           //contact: updatedContact
//         });
//       } catch (error) {
//         console.log(error);

//         res.sendStatus(500);
//       }
//     });

//     //DElete contact by id

//     app.delete('/contacts/:id', async (req, res) => {
//       try {
//         const { contact } = req;
//         //get all contacts from DB
//         //delete contact by id
//         res.sendStatus(204);
//         //or
//         // res.status(200).json({
//         //   message: 'Success',
//         // });
//       } catch {
//         console.log(error);

//         res.sendStatus(500);
//       }
//     });
//     //save contact data DB
//     const contactsDB = await fs.readFile(contacts.json);

//     const contacts = JSON.parse(contactsDB);

//     contacts.push(newContact);

//     await fs.writeFile('contacts.json', JSON.stringify(contacts));


//     //send respons to the FE
//     res.status(201).json({
//       message: 'Contact created!',
//       contact: newContact;
//     })
//   } catch (error) {
//     console.log(error);

//     res.sendStatus(500);
//   }
// });

// app.get('/contacts', (req, res) => {
//   res.status(200).json({
//     msg: 'get it!',
//   });
// });

// SERVER INIT
const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server  is up and running on port ${port}`);
});

// const express = require('express');
// const dotenv = require('dotenv');
// const morgan = require('morgan');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const fs = require('fs');

// dotenv.config({
//   path: process.env.NODE_ENV === 'production' ? './environments/production.env.example' : './environments/development.env.example',
// });

// const contactRoutes = require('./routes/api/contactsRoutes');
// const app = express();

// if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// // MONGODB CONNECTION
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Mongo DB successfully connected!');
// }).catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
//   process.exit(1);
// });

// // MIDDLEWARES
// app.use(express.json());
// app.use(cors());
// app.use(express.static("public"));

// // Custom general middleware to sign time string to req object
// app.use((req, res, next) => {
//   req.time = new Date().toLocaleString('uk-UA');
//   next();
// });

// // Middleware to find contact by id
// app.use('/contacts/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const contacts = JSON.parse(await fs.promises.readFile('contacts.json'));
//     const contact = contacts.find((item) => item.id === id);

//     if (!contact) {
//       return res.status(404).json({
//         message: 'Contact does not exist..',
//       });
//     }

//     req.contact = contact;

//     next();
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// // ROUTES
// app.use('/contacts', contactRoutes);

// app.get('/ping', (req, res) => {
//   res.status(200).json({
//     message: 'pong!',
//   });
// });

// // Not found request handler
// app.all('*', (req, res) => {
//   res.status(404).json({
//     message: 'Oops! Resource not found...',
//   });
// });

// // Global error handler. Four arguments are required!
// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({
//     message: err.message,
//   });
// });

// // SERVER INIT
// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is up and running on port ${port}`);
// });