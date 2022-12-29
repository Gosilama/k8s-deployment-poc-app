const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const router = require('./router');

const app = express();

app.use(compression());
app.use(helmet());
app.use(morgan('tiny'));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api', router);

module.exports = app;
