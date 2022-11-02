const app = require('./app')
const mongoose = require('mongoose');
const cfonts = require('cfonts');
const chalk = require('chalk');

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

mongoose.Promise = global.Promise;


const connection = mongoose.connect(uriDb);
connection
  .then(() => {
    console.log(chalk.green("\n====== Database connection successful ======"));
    app.listen(PORT, function () {
      console.log(chalk.green(`\n======Server running. Use our API on port: ${PORT}======`));
      cfonts.say('Simple Rest API',{
          font: 'simple',
          align: 'center',
          gradient: ['blue', 'yellow'],
          transitionGradient: true,
        });
  
    });
  })
  .catch(err => { 
    console.log(chalk.red(`Server not running. Error message: ${err.message}`));
    process.exit(1);
  }

  );