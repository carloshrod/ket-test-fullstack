const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/index.routes.js');
const errorHandler = require('./middlewares/errorHandler.js');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use(router);

// Errors middleware
app.use(errorHandler);

module.exports = app;
