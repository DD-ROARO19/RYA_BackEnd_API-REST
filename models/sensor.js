const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    lectura: String,
    fecha: String,
    hora: String
});

mongoose.model('Sensor', sensorSchema);
