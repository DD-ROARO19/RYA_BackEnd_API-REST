var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// >>>> BASE DE DATOS <<<<
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ROAROyASOCIADOS_db');

// >>>> MODELOS (SHEMAS) <<<<
require('./models/cita');
require('./models/caso');
require('./models/cliente');
require('./models/abogado');
require('./models/admin');

// >>>> RUTAS <<<<
var citasRouter = require('./routes/citas');
var casosRouter = require('./routes/casos');
var clienteRouter = require('./routes/clientes');
var abogadoRouter = require('./routes/abogados');
var adminRouter = require('./routes/admins');
var indexRouter = require('./routes/index');  //Desactivar? (dejar de momento)
var usersRouter = require('./routes/users');  //Desactivar? (dejar)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Cors
app.use(cors(
  {
    origin: 'http://localhost:4200',
    methods: ['GET', 'DELETE', 'PUT', 'POST'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  }
  ));

// >>>> RUTAS PROYECTO APIREST <<<<
app.use('/', indexRouter);      //(dejar de momento)
app.use('/users', usersRouter); //(dejar)
app.use('/casos', casosRouter);
app.use('/citas', citasRouter);
app.use('/clientes', clienteRouter);
app.use('/abogados', abogadoRouter);
app.use('/door', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;