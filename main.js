console.log('main')

const app = require('./src/app');
require('dotenv/config') 

const port = process.env.PORT || 5000;

// importing db conection instance

require('./src/apis/database/databaseConection')

app.listen(port, () => {
  
  console.log(`Listening: http://localhost:${port}`);
  
});
