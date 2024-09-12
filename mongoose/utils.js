 const { DB_PROTOCOL, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

 const getConectionUrl = () => {
    if (!DB_PROTOCOL || !DB_USER || !DB_PASSWORD || !DB_HOST) {
      console.error('One or more required environment variables are not set.');
      process.exit(1);
    }
  else{
    const connectionUrl = `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/bdContacts?retryWrites=true&w=majority`;
    console.log('Database connection successful');
    return connectionUrl;
  }
    
  };
  
 module.exports = {
    getConectionUrl,
 }
