require('module-alias/register');

require('dotenv').config();
const port = process.env.port;

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
//const compression = require('compression')

// Database
const corsOptions = require('@configs/corsOptions.config');
const dbConnect = require('./database/connect.database');
dbConnect();

// Middlewares
const errorHandler = require('@middlewares/errorHandler.middleware');
const cookieParser = require('cookie-parser');
app.use(morgan('dev'));
//app.use(compression)
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());


// Route
const { authRoute, signUpRoute } = require('@routes');

app.use('/', signUpRoute);
app.use('/auth', authRoute);

app.use(errorHandler)

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
