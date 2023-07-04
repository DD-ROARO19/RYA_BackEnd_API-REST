//Model
const mongoose = require('mongoose');

const CitaShema = new mongoose.Schema({
    nombre:String,
    apellido_paterno:String,
    apellido_materno:String,
    email:String,
    telefono:String,
    fecha:Date,
    hora:String,
    descripcion:String,
    estado:Boolean
});

mongoose.model('Cita', CitaShema);