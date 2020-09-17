const express = require('express');

// const morgan = require('morgan');
// const helmet = require('helmet');

const middlewares = require('./middlewares');
const apis = require('./apis');


const app = express();
// app.set('trust proxy', 1);
// app.use(cors())
// app.use(morgan('dev'));
// app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '✨Root✨'
  });
});


app.use('/api/v1', apis);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


module.exports = app;